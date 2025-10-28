"use client";

import { Asset } from "@/config/constants";
import { OrderForm } from "./OrderForm";

interface TradingContainerProps {
  asset: Asset;
  priceFromOrderbook?: { price: number; side: "BUY" | "SELL" } | null;
}

export function TradingContainer({
  asset,
  priceFromOrderbook,
}: TradingContainerProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
      <h2 className="text-xl font-semibold mb-4">Place Order</h2>
      <OrderForm asset={asset} priceFromOrderbook={priceFromOrderbook} />
    </div>
  );
}
