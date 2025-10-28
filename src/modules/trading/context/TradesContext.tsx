"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Trade } from "../types";

interface TradesContextType {
  trades: Trade[];
  addTrade: (trade: Trade) => void;
  clearTrades: () => void;
}

const TradesContext = createContext<TradesContextType | undefined>(undefined);

export function TradesProvider({ children }: { children: ReactNode }) {
  const [trades, setTrades] = useState<Trade[]>([]);

  const addTrade = useCallback((trade: Trade) => {
    setTrades((prev) => [trade, ...prev]);
  }, []);

  const clearTrades = useCallback(() => {
    setTrades([]);
  }, []);

  return (
    <TradesContext.Provider value={{ trades, addTrade, clearTrades }}>
      {children}
    </TradesContext.Provider>
  );
}

export function useTrades() {
  const context = useContext(TradesContext);
  if (!context) {
    throw new Error("useTrades must be used within TradesProvider");
  }
  return context;
}
