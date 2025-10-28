export default function TradingPage() {
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Crypto Trading Platform
          </h1>
          <p className="text-gray-400">
            Real-time order book visualization and trading
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Order Book</h2>
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500 pb-2 border-b border-gray-800">
                <span>Price (USD)</span>
                <span>Amount</span>
                <span>Total</span>
              </div>
              <p className="text-gray-600 text-center py-8">
                Orderbook will be loaded here...
              </p>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Place Order</h2>
            <p className="text-gray-600 text-center py-8">
              Order form will be loaded here...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
