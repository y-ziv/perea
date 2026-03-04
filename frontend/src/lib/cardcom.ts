const CARDCOM_API = "https://secure.cardcom.solutions/api/v11";

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

export async function createLowProfile(
  params: LowProfileCreateParams
): Promise<LowProfileCreateResponse> {
  const amount = Number((params.totalAgorot / 100).toFixed(2));

  const body = {
    TerminalNumber: Number(process.env.CARDCOM_TERMINAL_NUMBER) || 1000,
    ApiName: process.env.CARDCOM_API_NAME || "",
    ApiPassword: process.env.CARDCOM_API_PASSWORD || "",
    Amount: amount,
    CoinID: 1, // ILS
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
        UnitCost: Number((p.priceAgorot / 100).toFixed(2)),
        Quantity: p.quantity,
      })),
    },
  };

  const res = await fetch(`${CARDCOM_API}/LowProfile/Create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok || data.ResponseCode !== 0) {
    throw new Error(
      `Cardcom LowProfile error: ${data.Description || JSON.stringify(data)}`
    );
  }

  return {
    url: data.Url,
    lowProfileCode: data.LowProfileCode,
  };
}

interface LpResult {
  approved: boolean;
  cardcomTransactionId: string;
  returnValue: string;
  sumBilled: number; // in ILS
}

export async function getLowProfileResult(
  lowProfileCode: string
): Promise<LpResult> {
  const body = {
    TerminalNumber: Number(process.env.CARDCOM_TERMINAL_NUMBER) || 1000,
    ApiName: process.env.CARDCOM_API_NAME || "",
    ApiPassword: process.env.CARDCOM_API_PASSWORD || "",
    LowProfileCode: lowProfileCode,
  };

  const res = await fetch(`${CARDCOM_API}/LowProfile/GetLpResult`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return {
    approved: data.DealResponse === 0,
    cardcomTransactionId: String(data.InternalDealNumber || ""),
    returnValue: data.ReturnValue || "",
    sumBilled: data.Amount || data.Sum || 0,
  };
}
