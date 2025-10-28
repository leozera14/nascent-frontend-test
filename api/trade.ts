import type { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { asset, side, type, quantity, price, notional } = req.body;

  if (!asset || !side || !type || !quantity || !notional) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (type === "LIMIT" && !price) {
    return res
      .status(400)
      .json({ error: "Price is required for LIMIT orders" });
  }

  const trade = {
    id: randomUUID(),
    asset,
    side,
    type,
    quantity,
    price: type === "LIMIT" ? price : undefined,
    notional,
    timestamp: Date.now(),
    status: "completed",
  };

  res.status(200).json(trade);
}
