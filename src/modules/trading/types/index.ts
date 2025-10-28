import { Asset } from "@/config/constants";

export type OrderSide = "BUY" | "SELL";
export type OrderType = "LIMIT" | "MARKET";

export interface TradeRequest {
  asset: Asset;
  side: OrderSide;
  type: OrderType;
  quantity: number;
  notional: number;
  price?: number;
}

export interface TradeResponse extends TradeRequest {
  id: string;
  timestamp: number;
}

export interface OrderFormState {
  side: OrderSide;
  type: OrderType;
  price: string;
  quantity: string;
  notional: string;
}

export interface FormErrors {
  price?: string;
  quantity?: string;
  notional?: string;
}

export interface Trade {
  id: string;
  asset: Asset;
  side: OrderSide;
  type: OrderType;
  price?: number;
  quantity: number;
  notional: number;
  timestamp: number;
  status: "completed" | "pending" | "failed";
}
