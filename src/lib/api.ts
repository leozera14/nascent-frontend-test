const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "/http://localhost:3001/api";

export async function fetchOrderbook(asset: string) {
  const response = await fetch(`${API_BASE_URL}/orderbook?asset=${asset}`);

  if (!response.ok) {
    throw new Error("Failed to fetch orderbook");
  }

  return response.json();
}

export async function sendTrade(tradeData: any) {
  const response = await fetch(`${API_BASE_URL}/trade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tradeData),
  });

  if (!response.ok) {
    throw new Error("Failed to send trade");
  }

  return response.json();
}
