export function EmptyTrades() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center text-gray-500">
        <svg
          className="w-12 h-12 mx-auto mb-2 opacity-50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <p className="text-sm">No trades yet</p>
        <p className="text-xs mt-1">Your orders will appear here</p>
      </div>
    </div>
  );
}
