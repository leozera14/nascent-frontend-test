"use client";

import { formatPrice, formatQuantity, formatTotal } from "@/utils/formatters";

interface OrderbookRowProps {
  price: number;
  quantity: number;
  total: number;
  depth: number;
  side: "bid" | "ask";
  onPriceClick?: (price: number, side: "BUY" | "SELL") => void;
}

export function OrderbookRow({
  price,
  quantity,
  total,
  depth,
  side,
  onPriceClick,
}: OrderbookRowProps) {
  const bgColor = side === "bid" ? "bg-green-500/10" : "bg-red-500/10";
  const textColor = side === "bid" ? "text-green-400" : "text-red-400";

  const handleClick = () => {
    if (onPriceClick) {
      const orderSide = side === "bid" ? "SELL" : "BUY";
      onPriceClick(price, orderSide);
    }
  };

  return (
    <div
      className="relative group hover:bg-gray-800/50 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <div
        className={`absolute inset-y-0 right-0 ${bgColor} transition-all`}
        style={{ width: `${depth}%` }}
      />

      <div className="relative grid grid-cols-3 gap-4 px-3 py-1.5 text-sm">
        <span
          className={`font-mono ${textColor} group-hover:font-semibold transition-all`}
        >
          {formatPrice(price)}
        </span>
        <span className="text-gray-300 text-right font-mono">
          {formatQuantity(quantity)}
        </span>
        <span className="text-gray-400 text-right font-mono">
          {formatTotal(total)}
        </span>
      </div>

      <div className="absolute left-0 top-full mt-1 hidden group-hover:block z-10 pointer-events-none">
        <div className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs text-gray-300 whitespace-nowrap shadow-lg">
          Click to {side === "bid" ? "sell" : "buy"} at {formatPrice(price)}
        </div>
      </div>
    </div>
  );
}
