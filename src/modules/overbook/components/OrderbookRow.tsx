"use client";

import { Asset } from "@/config/constants";
import { formatPrice, formatQuantity, formatTotal } from "@/utils/formatters";

interface OrderbookRowProps {
  price: number;
  quantity: number;
  total: number;
  asset: Asset;
  side: "bid" | "ask";
  maxTotal: number;
}

export function OrderbookRow({
  price,
  quantity,
  total,
  asset,
  side,
  maxTotal,
}: OrderbookRowProps) {
  const depthPercentage = (total / maxTotal) * 100;
  const bgColor = side === "bid" ? "bg-green-500/10" : "bg-red-500/10";
  const textColor = side === "bid" ? "text-green-400" : "text-red-400";

  return (
    <div className="relative group hover:bg-gray-800/50 transition-colors">
      <div
        className={`absolute inset-y-0 right-0 ${bgColor} transition-all`}
        style={{ width: `${depthPercentage}%` }}
      />

      <div className="relative grid grid-cols-3 gap-2 px-3 py-1.5 text-sm">
        <span className={`font-mono ${textColor}`}>
          {formatPrice(price, asset)}
        </span>
        <span className="text-gray-300 text-right font-mono">
          {formatQuantity(quantity, asset)}
        </span>
        <span className="text-gray-400 text-right font-mono">
          {formatTotal(total)}
        </span>
      </div>
    </div>
  );
}
