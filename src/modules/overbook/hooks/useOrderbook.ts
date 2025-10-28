"use client";

import { useState, useEffect, useCallback } from "react";
import { Asset, ORDERBOOK_UPDATE_INTERVAL } from "@/config/constants";
import { Orderbook } from "../types";
import { fetchOrderbook } from "../services/overbookService";

export function useOrderbook(asset: Asset) {
  const [orderbook, setOrderbook] = useState<Orderbook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOrderbook = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchOrderbook(asset);
      setOrderbook(data);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load orderbook");
      setLoading(false);
    }
  }, [asset]);

  useEffect(() => {
    loadOrderbook();
  }, [loadOrderbook]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadOrderbook();
    }, ORDERBOOK_UPDATE_INTERVAL);

    return () => clearInterval(interval);
  }, [loadOrderbook]);

  return { orderbook, loading, error, refresh: loadOrderbook };
}
