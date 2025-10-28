import { Asset } from "@/config/constants";
import { Orderbook, OrderbookResponse } from "../types";

export const getOrderbook = async (asset: Asset): Promise<Orderbook> => {
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

    const data: OrderbookResponse = await response.json();

    // Process the data
    return processOrderbookData(data);
  } catch (error) {
    console.error("Error fetching orderbook:", error);
    throw error;
  }
};

function processOrderbookData(data: OrderbookResponse): Orderbook {
  // Parse string values to numbers
  const parsedBids = data.bids.map(([price, quantity]) => [
    parseFloat(price),
    parseFloat(quantity),
  ]) as [number, number][];

  const parsedAsks = data.asks.map(([price, quantity]) => [
    parseFloat(price),
    parseFloat(quantity),
  ]) as [number, number][];

  // Calculate max volume for depth visualization
  const maxBidVolume = Math.max(...parsedBids.map(([_, quantity]) => quantity));
  const maxAskVolume = Math.max(...parsedAsks.map(([_, quantity]) => quantity));
  const maxVolume = Math.max(maxBidVolume, maxAskVolume);

  // Process bids (sorted descending by price, take top 8)
  const bids = parsedBids
    .sort((a, b) => b[0] - a[0])
    .slice(0, 8)
    .map(([price, quantity]) => ({
      price,
      quantity,
      total: price * quantity,
      depth: (quantity / maxVolume) * 100,
    }));

  // Process asks (sorted ascending by price, take top 8)
  const asks = parsedAsks
    .sort((a, b) => a[0] - b[0])
    .slice(0, 8)
    .map(([price, quantity]) => ({
      price,
      quantity,
      total: price * quantity,
      depth: (quantity / maxVolume) * 100,
    }));

  // Calculate spread
  const bestBid = bids[0]?.price || 0;
  const bestAsk = asks[0]?.price || 0;
  const spread = bestAsk - bestBid;
  const spreadPercentage = bestBid > 0 ? (spread / bestBid) * 100 : 0;

  return {
    lastUpdateId: data.lastUpdateId,
    bids,
    asks,
    spread,
    spreadPercentage,
  };
}
