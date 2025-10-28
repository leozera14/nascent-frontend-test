"use client";

import { Asset } from "@/config/constants";
import { OrderForm } from "./PlaceOrder/OrderForm";
import { TradesDisplay } from "./TradesDiplay";
interface TradingContainerProps {
  asset: Asset;
  priceFromOrderbook?: { price: number; side: "BUY" | "SELL" } | null;
}

export function TradingContainer({
  asset,
  priceFromOrderbook,
}: TradingContainerProps) {
  return (
    <div className="h-full flex flex-col gap-4 max-h-full overflow-hidden">
      <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 h-full max-h-[65%] flex flex-col">
        <h2 className="text-lg font-semibold mb-3">Place Order</h2>
        <div className="flex-1 relative">
          <OrderForm asset={asset} priceFromOrderbook={priceFromOrderbook} />
        </div>
      </div>

      <div className="h-full max-h-[35%]">
        <TradesDisplay />
      </div>
    </div>
  );
}
