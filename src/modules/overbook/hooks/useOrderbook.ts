"use client";

import { useQuery } from "@tanstack/react-query";
import { Asset } from "@/config/constants";
import { getOrderbook } from "../lib";
import { Orderbook } from "../types";

export function useOrderbook(asset: Asset) {
  const {
    data: orderbook,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Orderbook>({
    queryKey: ["orderbook", asset],
    queryFn: () => getOrderbook(asset),
  });

  return {
    orderbook,
    loading: isLoading,
    error: isError
      ? error instanceof Error
        ? error.message
        : "Failed to fetch orderbook"
      : null,
    refetch,
  };
}
