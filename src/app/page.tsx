"use client";

import { useState } from "react";
import { Asset } from "@/config/constants";
import { useOrderbook } from "@/modules/overbook/hooks/useOrderbook";
import { OrderbookTable } from "@/modules/overbook/components/OrderbookTable";

export default function TradingPage() {
  const [selectedAsset, setSelectedAsset] = useState<Asset>("BTC");
  const { orderbook, loading, error } = useOrderbook(selectedAsset);

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

        <div className="mb-6 flex gap-2">
          <button
            onClick={() => setSelectedAsset("BTC")}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              selectedAsset === "BTC"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Bitcoin
          </button>
          <button
            onClick={() => setSelectedAsset("ETH")}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
              selectedAsset === "ETH"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Ethereum
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h2 className="text-xl font-semibold mb-4">Order Book</h2>

            {loading && (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
                <p className="mt-4 text-gray-500">Loading orderbook...</p>
              </div>
            )}

            {error && (
              <div className="text-center py-12">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {orderbook && !loading && !error && (
              <OrderbookTable orderbook={orderbook} asset={selectedAsset} />
            )}
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
