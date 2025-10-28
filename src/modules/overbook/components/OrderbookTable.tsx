"use client";

import { Asset } from "@/config/constants";
import { OrderbookRow } from "./OrderbookRow";
import { SpreadIndicator } from "./SpreadIndicator";
import { Orderbook } from "../types";

interface OrderbookTableProps {
  orderbook: Orderbook;
  asset: Asset;
}

export function OrderbookTable({ orderbook, asset }: OrderbookTableProps) {
  const { bids, asks, spread, spreadPercentage } = orderbook;

  const maxBidTotal = bids.length > 0 ? bids[bids.length - 1].total : 0;
  const maxAskTotal = asks.length > 0 ? asks[asks.length - 1].total : 0;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 px-3 py-2 text-xs font-semibold text-gray-500 border-b border-gray-800">
        <span>Price (USD)</span>
        <span className="text-right">Amount ({asset})</span>
        <span className="text-right">Total</span>
      </div>

      <div className="space-y-px custom-scroll max-h-[300px] overflow-y-auto">
        {[...asks].reverse().map((ask, index) => (
          <OrderbookRow
            key={`ask-${index}`}
            price={ask.price}
            quantity={ask.quantity}
            total={ask.total}
            asset={asset}
            side="ask"
            maxTotal={maxAskTotal}
          />
        ))}
      </div>

      <SpreadIndicator spread={spread} spreadPercentage={spreadPercentage} />

      <div className="space-y-px custom-scroll max-h-[300px] overflow-y-auto">
        {bids.map((bid, index) => (
          <OrderbookRow
            key={`bid-${index}`}
            price={bid.price}
            quantity={bid.quantity}
            total={bid.total}
            asset={asset}
            side="bid"
            maxTotal={maxBidTotal}
          />
        ))}
      </div>
    </div>
  );
}
