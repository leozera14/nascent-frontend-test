"use client";

interface SpreadIndicatorProps {
  spread: number;
  spreadPercentage: number;
}

export function SpreadIndicator({
  spread,
  spreadPercentage,
}: SpreadIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-4 py-3 bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-1">Spread</p>
        <p className="text-sm font-semibold text-gray-300">
          ${spread.toFixed(2)}
        </p>
      </div>
      <div className="h-8 w-px bg-gray-700" />
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-1">Spread %</p>
        <p className="text-sm font-semibold text-gray-300">
          {spreadPercentage.toFixed(3)}%
        </p>
      </div>
    </div>
  );
}
