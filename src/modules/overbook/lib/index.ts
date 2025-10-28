import { Asset } from "@/config/constants";
import { OrderbookResponse } from "../types";

export const getOrderbook = async (
  asset: Asset
): Promise<OrderbookResponse> => {
  try {
    const response = await fetch(`/orderbook/${asset}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Failed to fetch orderbook`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching orderbook:", error);
    throw error;
  }
};
