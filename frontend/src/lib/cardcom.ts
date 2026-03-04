import "server-only";
import { env } from "@/lib/env";

const CARDCOM_API = "https://secure.cardcom.solutions/api/v11";
const FETCH_TIMEOUT_MS = 15_000;

interface ProductLine {
  description: string;
  priceAgorot: number;
  quantity: number;
}

interface LowProfileCreateParams {
  totalAgorot: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  webhookUrl: string;
  successUrl: string;
  failureUrl: string;
  products: ProductLine[];
}

interface LowProfileCreateResponse {
  url: string;
  lowProfileCode: string;
}

function agorotToShekel(agorot: number): number {
  return Math.round(agorot) / 100;
}

function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timeout)
  );
}

export async function createLowProfile(
  params: LowProfileCreateParams
): Promise<LowProfileCreateResponse> {
  const body = {
    TerminalNumber: Number(env.CARDCOM_TERMINAL_NUMBER),
    ApiName: env.CARDCOM_API_NAME,
    ApiPassword: env.CARDCOM_API_PASSWORD,
    Amount: agorotToShekel(params.totalAgorot),
    CoinID: 1,
    Language: "he",
    Operation: "ChargeOnly",
    ReturnValue: params.orderId,
    SuccessRedirectUrl: params.successUrl,
    FailedRedirectUrl: params.failureUrl,
    WebHookUrl: params.webhookUrl,
    Document: {
      Name: params.customerName,
      Email: params.customerEmail,
      Products: params.products.map((p) => ({
        Description: p.description,
        UnitCost: agorotToShekel(p.priceAgorot),
        Quantity: p.quantity,
      })),
    },
  };

  const res = await fetchWithTimeout(`${CARDCOM_API}/LowProfile/Create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data: Record<string, unknown>;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Cardcom LowProfile returned non-JSON response (HTTP ${res.status})`);
  }

  if (!res.ok || data.ResponseCode !== 0) {
    throw new Error(
      `Cardcom LowProfile error: ${data.Description || JSON.stringify(data)}`
    );
  }

  return {
    url: data.Url as string,
    lowProfileCode: data.LowProfileCode as string,
  };
}

export interface LpResult {
  approved: boolean;
  cardcomTransactionId: string;
  returnValue: string;
  sumBilled: number | null;
}

export async function getLowProfileResult(
  lowProfileCode: string
): Promise<LpResult> {
  const body = {
    TerminalNumber: Number(env.CARDCOM_TERMINAL_NUMBER),
    ApiName: env.CARDCOM_API_NAME,
    ApiPassword: env.CARDCOM_API_PASSWORD,
    LowProfileCode: lowProfileCode,
  };

  const res = await fetchWithTimeout(`${CARDCOM_API}/LowProfile/GetLpResult`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Cardcom GetLpResult HTTP error: ${res.status}`);
  }

  const data = await res.json();

  // Log non-sensitive response fields for debugging
  console.info("Cardcom GetLpResult:", {
    ResponseCode: data.ResponseCode,
    DealResponse: data.DealResponse,
    InternalDealNumber: data.InternalDealNumber,
    ReturnValue: data.ReturnValue,
  });

  // Cardcom v11 returns DealResponse=0 for approved deals.
  // Only trust DealResponse — ResponseCode alone is not sufficient proof of approval.
  const dealResponse = data.DealResponse ?? data.dealResponse;

  const approved = dealResponse === 0 || dealResponse === "0";

  return {
    approved,
    cardcomTransactionId: String(data.InternalDealNumber || data.internalDealNumber || ""),
    returnValue: data.ReturnValue || data.returnValue || "",
    sumBilled: data.Amount ?? data.Sum ?? data.amount ?? null,
  };
}
