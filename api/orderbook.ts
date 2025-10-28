import type { NextApiRequest, NextApiResponse } from "next";
import { readFileSync } from "fs";
import { join } from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { asset } = req.query;

  if (!asset || (asset !== "BTC" && asset !== "ETH")) {
    return res.status(400).json({ error: "Invalid asset. Use BTC or ETH." });
  }

  try {
    const filePath = join(
      process.cwd(),
      "server",
      "data",
      `${asset.toLowerCase()}_orderbook.json`
    );
    const data = readFileSync(filePath, "utf-8");
    const orderbook = JSON.parse(data);

    res.status(200).json(orderbook);
  } catch (error) {
    console.error("Error loading orderbook:", error);
    res.status(500).json({ error: "Failed to load orderbook data" });
  }
}
