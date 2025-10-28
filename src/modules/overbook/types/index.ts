export interface OrderbookResponse {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
}

export interface OrderbookEntry {
  price: number;
  quantity: number;
  total: number;
}

export interface Orderbook {
  lastUpdateId: number;
  bids: OrderbookEntry[];
  asks: OrderbookEntry[];
  spread: number;
  spreadPercentage: number;
}
