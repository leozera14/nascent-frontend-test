"use client";

import { useTrades } from "../../context/TradesContext";
import { EmptyTrades } from "./EmptyTrades";
import { TradeCard } from "./TradeCard";

export function TradesDisplay() {
  const { trades, clearTrades } = useTrades();

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 h-full max-h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Recent Trades</h3>
        <button
          onClick={clearTrades}
          className="text-xs text-gray-400 hover:text-red-400 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="h-full max-h-full overflow-y-auto space-y-2 pr-1">
        {trades.length ? (
          <>
            {trades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} />
            ))}
          </>
        ) : (
          <EmptyTrades />
        )}
      </div>
    </div>
  );
}
