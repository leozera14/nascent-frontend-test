"use client";

import { OrderType } from "../types";

interface OrderTypeToggleProps {
  value: OrderType;
  onChange: (type: OrderType) => void;
}

export function OrderTypeToggle({ value, onChange }: OrderTypeToggleProps) {
  return (
    <div className="flex gap-2 p-1 bg-gray-800 rounded-lg">
      <button
        type="button"
        onClick={() => onChange("LIMIT")}
        className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
          value === "LIMIT"
            ? "bg-gray-700 text-white"
            : "text-gray-400 hover:text-gray-300"
        }`}
      >
        Limit
      </button>
      <button
        type="button"
        onClick={() => onChange("MARKET")}
        className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
          value === "MARKET"
            ? "bg-gray-700 text-white"
            : "text-gray-400 hover:text-gray-300"
        }`}
      >
        Market
      </button>
    </div>
  );
}
