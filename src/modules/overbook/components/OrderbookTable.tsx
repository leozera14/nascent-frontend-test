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
  return (
    <div className="space-y-2">
      <div className="grid grid-cols-3 gap-4 pb-2 border-b border-gray-800 text-sm font-medium text-gray-400">
        <div>Price (USD)</div>
        <div className="text-right">Amount ({asset})</div>
        <div className="text-right">Total (USD)</div>
      </div>

      <div className="space-y-1">
        {[...orderbook.asks].reverse().map((ask, index) => (
          <OrderbookRow
            key={`ask-${index}`}
            price={ask.price}
            quantity={ask.quantity}
            total={ask.total}
            depth={ask.depth}
            side="ask"
          />
        ))}
      </div>

      <SpreadIndicator
        spread={orderbook.spread}
        spreadPercentage={orderbook.spreadPercentage}
      />

      <div className="space-y-1">
        {orderbook.bids.map((bid, index) => (
          <OrderbookRow
            key={`bid-${index}`}
            price={bid.price}
            quantity={bid.quantity}
            total={bid.total}
            depth={bid.depth}
            side="bid"
          />
        ))}
      </div>
    </div>
  );
}
