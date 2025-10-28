"use client";

import { Asset } from "@/config/constants";
import { useOrderbook } from "../hooks/useOrderbook";
import { OrderbookTable } from "./OrderbookTable";

interface OrderbookContainerProps {
  asset: Asset;
}

export function OrderbookContainer({ asset }: OrderbookContainerProps) {
  const { orderbook, loading, error } = useOrderbook(asset);

  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h2 className="text-xl font-semibold mb-4">Order Book</h2>

      {loading && (
        <div className="text-center py-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-4 text-gray-500">Loading orderbook...</p>
        </div>
      )}

      {error && (
        <div className="text-center py-12">
          <p className="text-red-400">{error}</p>
        </div>
      )}

      {orderbook && !loading && !error && (
        <OrderbookTable orderbook={orderbook} asset={asset} />
      )}
    </div>
  );
}
