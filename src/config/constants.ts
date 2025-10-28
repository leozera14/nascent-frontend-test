export const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "/api"; // fallback for prod

// Supported Assets
export const ASSETS = ["BTC", "ETH"] as const;
export type Asset = (typeof ASSETS)[number];

// Asset Display Names
export const ASSET_NAMES: Record<Asset, string> = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
};

// Asset Symbols
export const ASSET_SYMBOLS: Record<Asset, string> = {
  BTC: "₿",
  ETH: "Ξ",
};

export const ORDERBOOK_DEPTH = 15; // Number of price levels to display per side
export const ORDERBOOK_UPDATE_INTERVAL = 5000; // 5000 ms -> 5 seconds

// Formatting
export const PRICE_DECIMALS: Record<Asset, number> = {
  BTC: 2,
  ETH: 2,
};

export const QUANTITY_DECIMALS: Record<Asset, number> = {
  BTC: 5,
  ETH: 4,
};
