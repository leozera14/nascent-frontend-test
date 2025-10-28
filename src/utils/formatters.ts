/**
 * Format price with appropriate decimal places
 */
export function formatPrice(price: number): string {
  return price.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Format quantity with appropriate decimal places
 */
export function formatQuantity(quantity: number): string {
  return quantity.toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 8,
  });
}

/**
 * Format total (notional) value
 */
export function formatTotal(total: number): string {
  return total.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
