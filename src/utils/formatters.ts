import { Asset, PRICE_DECIMALS, QUANTITY_DECIMALS } from "@/config/constants";

/**
 * Format price with appropriate decimals for the asset
 */
export function formatPrice(price: number, asset: Asset): string {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: PRICE_DECIMALS[asset],
    maximumFractionDigits: PRICE_DECIMALS[asset],
  });
}

/**
 * Format quantity with appropriate decimals for the asset
 */
export function formatQuantity(quantity: number, asset: Asset): string {
  return quantity.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: QUANTITY_DECIMALS[asset],
  });
}

/**
 * Format total notional value
 */
export function formatTotal(total: number): string {
  return total.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
