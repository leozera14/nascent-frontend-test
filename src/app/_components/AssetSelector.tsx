"use client";

import { Asset, ASSET_NAMES } from "@/config/constants";

interface AssetSelectorProps {
  selectedAsset: Asset;
  onAssetChange: (asset: Asset) => void;
}

export function AssetSelector({
  selectedAsset,
  onAssetChange,
}: AssetSelectorProps) {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => onAssetChange("BTC")}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          selectedAsset === "BTC"
            ? "bg-blue-600 text-white"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
        }`}
      >
        {ASSET_NAMES.BTC}
      </button>
      <button
        onClick={() => onAssetChange("ETH")}
        className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
          selectedAsset === "ETH"
            ? "bg-blue-600 text-white"
            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
        }`}
      >
        {ASSET_NAMES.ETH}
      </button>
    </div>
  );
}
