import { Asset, ORDERBOOK_DEPTH } from "@/config/constants";
import { Orderbook, OrderbookEntry } from "../types";
import { getOrderbook } from "../lib";

/**
 * Process raw orderbook entries into display format with cumulative totals
 */
function processOrderbookEntries(
  entries: [string, string][],
  depth: number
): OrderbookEntry[] {
  let cumulativeTotal = 0;

  return entries.slice(0, depth).map(([price, quantity]) => {
    const priceNum = parseFloat(price);
    const quantityNum = parseFloat(quantity);
    cumulativeTotal += quantityNum;

    return {
      price: priceNum,
      quantity: quantityNum,
      total: cumulativeTotal,
    };
  });
}

/**
 * Calculate spread between best bid and best ask
 */
function calculateSpread(
  bids: OrderbookEntry[],
  asks: OrderbookEntry[]
): {
  spread: number;
  spreadPercentage: number;
} {
  if (bids.length === 0 || asks.length === 0) {
    return { spread: 0, spreadPercentage: 0 };
  }

  const bestBid = bids[0].price;
  const bestAsk = asks[0].price;
  const spread = bestAsk - bestBid;
  const midPrice = (bestBid + bestAsk) / 2;
  const spreadPercentage = (spread / midPrice) * 100;

  return { spread, spreadPercentage };
}

/**
 * Fetch and process orderbook data for a given asset
 */
export async function fetchOrderbook(asset: Asset): Promise<Orderbook> {
  const data = await getOrderbook(asset);

  const bids = processOrderbookEntries(data.bids, ORDERBOOK_DEPTH);
  const asks = processOrderbookEntries(data.asks, ORDERBOOK_DEPTH);

  const { spread, spreadPercentage } = calculateSpread(bids, asks);

  return {
    lastUpdateId: data.lastUpdateId,
    bids,
    asks,
    spread,
    spreadPercentage,
  };
}
