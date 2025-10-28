import { TradeRequest, TradeResponse } from "../types";

export const sendTrade = async (
  tradeData: TradeRequest
): Promise<TradeResponse> => {
  try {
    const response = await fetch("/trade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tradeData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to submit trade");
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending trade:", error);
    throw error;
  }
};
