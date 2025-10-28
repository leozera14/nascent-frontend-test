"use client";

import { formatPrice, formatQuantity, formatTotal } from "@/utils/formatters";

interface OrderbookRowProps {
  price: number;
  quantity: number;
  total: number;
  depth: number;
  side: "bid" | "ask";
}

export function OrderbookRow({
  price,
  quantity,
  total,
  depth,
  side,
}: OrderbookRowProps) {
  const bgColor = side === "bid" ? "bg-green-500/10" : "bg-red-500/10";
  const textColor = side === "bid" ? "text-green-400" : "text-red-400";

  return (
    <div className="relative group hover:bg-gray-800/50 transition-colors">
      <div
        className={`absolute inset-y-0 right-0 ${bgColor} transition-all`}
        style={{ width: `${depth}%` }}
      />

      <div className="relative grid grid-cols-3 gap-4 px-3 py-1.5 text-sm">
        <span className={`font-mono ${textColor}`}>{formatPrice(price)}</span>
        <span className="text-gray-300 text-right font-mono">
          {formatQuantity(quantity)}
        </span>
        <span className="text-gray-400 text-right font-mono">
          {formatTotal(total)}
        </span>
      </div>
    </div>
  );
}
