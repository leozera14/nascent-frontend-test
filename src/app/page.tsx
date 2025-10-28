"use client";

import { useState } from "react";
import { Asset } from "@/config/constants";
import { TradingContainer } from "@/modules/trading/components/TradingContainer";
import { AssetSelector } from "./_components/AssetSelector";
import { OrderbookContainer } from "@/modules/overbook/components/OrderbookContainer";

export default function TradingPage() {
  const [selectedAsset, setSelectedAsset] = useState<Asset>("BTC");
  const [priceFromOrderbook, setPriceFromOrderbook] = useState<{
    price: number;
    side: "BUY" | "SELL";
  } | null>(null);

  const handlePriceClick = (price: number, side: "BUY" | "SELL") => {
    setPriceFromOrderbook({ price, side });
    setTimeout(() => setPriceFromOrderbook(null), 100);
  };

  return (
    <main className="h-screen flex flex-col px-6 py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        <header className="flex flex-col items-center justify-center mb-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            Crypto Trading Platform
          </h1>
          <p className="text-gray-400">
            Real-time order book visualization and trading
          </p>
        </header>

        <div className="flex items-center justify-center mb-4">
          <AssetSelector
            selectedAsset={selectedAsset}
            onAssetChange={setSelectedAsset}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
          <div className="lg:col-span-2 overflow-auto">
            <OrderbookContainer
              asset={selectedAsset}
              onPriceClick={handlePriceClick}
            />
          </div>

          <div className="overflow-auto">
            <TradingContainer
              asset={selectedAsset}
              priceFromOrderbook={priceFromOrderbook}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
