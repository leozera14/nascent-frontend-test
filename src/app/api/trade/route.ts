import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { asset, side, type, quantity, price, notional } = body;

  if (!asset || !side || !type || !quantity || !notional) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  if (type === "LIMIT" && !price) {
    return NextResponse.json(
      { error: "Price is required for LIMIT orders" },
      { status: 400 }
    );
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

  return NextResponse.json(trade);
}
