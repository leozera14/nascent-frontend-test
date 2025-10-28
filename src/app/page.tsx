"use client";

import { useState } from "react";
import { Asset } from "@/config/constants";
import { TradingContainer } from "@/modules/trading/components/TradingContainer";
import { AssetSelector } from "./_components/AssetSelector";
import { OrderbookContainer } from "@/modules/overbook/components/OrderbookContainer";

export default function TradingPage() {
  const [selectedAsset, setSelectedAsset] = useState<Asset>("BTC");
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSuccess = (message: string) => {
    setNotification({ type: "success", message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleError = (message: string) => {
    setNotification({ type: "error", message });
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <main className="min-h-screen px-6 py-1 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Crypto Trading Platform
          </h1>
          <p className="text-gray-400">
            Real-time order book visualization and trading
          </p>
        </header>

        {notification && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              notification.type === "success"
                ? "bg-green-500/10 border border-green-500 text-green-400"
                : "bg-red-500/10 border border-red-500 text-red-400"
            }`}
          >
            {notification.message}
          </div>
        )}

        <div className="py-4 flex items-center justify-center">
          <AssetSelector
            selectedAsset={selectedAsset}
            onAssetChange={setSelectedAsset}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrderbookContainer asset={selectedAsset} />
          </div>

          <TradingContainer
            asset={selectedAsset}
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>
      </div>
    </main>
  );
}
