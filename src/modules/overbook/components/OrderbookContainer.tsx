"use client";

import { Asset } from "@/config/constants";
import { useOrderbook } from "../hooks/useOrderbook";
import { OrderbookTable } from "./OrderbookTable";

interface OrderbookContainerProps {
  asset: Asset;
  onPriceClick?: (price: number, side: "BUY" | "SELL") => void;
}

export function OrderbookContainer({
  asset,
  onPriceClick,
}: OrderbookContainerProps) {
  const { orderbook, loading, error } = useOrderbook(asset);

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 h-full">
      <h2 className="text-xl font-semibold mb-4">Order Book</h2>

      {error && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 mb-4">
            <svg
              className="w-6 h-6 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-red-400 font-medium">{error}</p>
          <p className="text-gray-500 text-sm mt-2">Please try again later</p>
        </div>
      )}

      {orderbook && !loading && !error && (
        <OrderbookTable
          orderbook={orderbook}
          asset={asset}
          onPriceClick={onPriceClick}
        />
      )}
    </div>
  );
}
