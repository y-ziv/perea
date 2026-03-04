const CARDCOM_API_URL = "https://secure.cardcom.solutions/Interface";

interface LowProfileCreateParams {
  totalAgorot: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  indicatorUrl: string;
  successUrl: string;
  failureUrl: string;
}

interface LowProfileCreateResponse {
  url: string;
  lowProfileCode: string;
}

export async function createLowProfile(
  params: LowProfileCreateParams
): Promise<LowProfileCreateResponse> {
  const sumToBill = (params.totalAgorot / 100).toFixed(2);

  const body = new URLSearchParams({
    TerminalNumber: process.env.CARDCOM_TERMINAL_NUMBER || "1000",
    ApiName: process.env.CARDCOM_API_NAME || "",
    ApiPassword: process.env.CARDCOM_API_PASSWORD || "",
    SumToBill: sumToBill,
    CoinID: "1", // ILS
    Language: "he",
    SuccessRedirectUrl: params.successUrl,
    ErrorRedirectUrl: params.failureUrl,
    IndicatorUrl: params.indicatorUrl,
    ReturnValue: params.orderId,
    APILevel: "10",
    codepage: "65001", // UTF-8
    "IsVirtualTerminalMode": "true",
    InvoiceHead_CustName: params.customerName,
    InvoiceHead_Email: params.customerEmail,
  });

  const res = await fetch(`${CARDCOM_API_URL}/LowProfile.aspx`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  const text = await res.text();
  const result = Object.fromEntries(new URLSearchParams(text));

  if (result.ResponseCode !== "0") {
    throw new Error(`Cardcom LowProfile error: ${result.Description || text}`);
  }

  return {
    url: result.LowProfileUrl || result.url,
    lowProfileCode: result.LowProfileCode,
  };
}

interface IndicatorResult {
  approved: boolean;
  cardcomTransactionId: string;
  returnValue: string;
  sumBilled: number; // in ILS
}

export async function getLowProfileIndicator(
  lowProfileCode: string
): Promise<IndicatorResult> {
  const body = new URLSearchParams({
    TerminalNumber: process.env.CARDCOM_TERMINAL_NUMBER || "1000",
    ApiName: process.env.CARDCOM_API_NAME || "",
    ApiPassword: process.env.CARDCOM_API_PASSWORD || "",
    LowProfileCode: lowProfileCode,
  });

  const res = await fetch(
    `${CARDCOM_API_URL}/LowProfileClearing.aspx`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    }
  );

  const text = await res.text();
  const result = Object.fromEntries(new URLSearchParams(text));

  return {
    approved: result.OperationResponse === "0",
    cardcomTransactionId: result.InternalDealNumber || "",
    returnValue: result.ReturnValue || "",
    sumBilled: parseFloat(result.ExtShvaParams_Sum36 || "0"),
  };
}
