import { formatPrice, formatQuantity, formatTotal } from "@/utils/formatters";

interface TradeCardProps {
  trade: {
    id: string;
    asset: string;
    side: "BUY" | "SELL";
    type: "LIMIT" | "MARKET";
    price?: number;
    quantity: number;
    notional: number;
    timestamp: number;
    status: "completed" | "pending" | "failed";
  };
}

export function TradeCard({ trade }: TradeCardProps) {
  const sideColor = trade.side === "BUY" ? "text-green-400" : "text-red-400";
  const sideBg = trade.side === "BUY" ? "bg-green-500/10" : "bg-red-500/10";
  const sideBorder =
    trade.side === "BUY" ? "border-green-500/20" : "border-red-500/20";

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div
      className={`${sideBg} ${sideBorder} border rounded-lg p-3 hover:bg-opacity-20 transition-all`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`font-bold ${sideColor}`}>{trade.side}</span>
          <span className="text-gray-400 text-sm">{trade.asset}</span>
          <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">
            {trade.type}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {formatTimestamp(trade.timestamp)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {trade.type === "LIMIT" && trade.price && (
          <div>
            <span className="text-gray-500">Price:</span>
            <span className="text-gray-300 ml-1 font-mono">
              {formatPrice(trade.price)}
            </span>
          </div>
        )}
        <div>
          <span className="text-gray-500">Amount:</span>
          <span className="text-gray-300 ml-1 font-mono">
            {formatQuantity(trade.quantity)}
          </span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">Total:</span>
          <span className="text-gray-300 ml-1 font-mono font-semibold">
            {formatTotal(trade.notional)}
          </span>
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-gray-800">
        <span className="text-xs text-gray-600">ID: {trade.id}</span>
      </div>
    </div>
  );
}
