import { NextRequest, NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const asset = searchParams.get("asset");

  if (!asset || (asset !== "BTC" && asset !== "ETH")) {
    return NextResponse.json(
      { error: "Invalid asset. Use BTC or ETH." },
      { status: 400 }
    );
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

    return NextResponse.json(orderbook);
  } catch (error) {
    console.error("Error loading orderbook:", error);
    return NextResponse.json(
      { error: "Failed to load orderbook data" },
      { status: 500 }
    );
  }
}
