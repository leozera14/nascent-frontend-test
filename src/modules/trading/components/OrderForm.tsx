"use client";

import { Asset } from "@/config/constants";
import { OrderTypeToggle } from "./OrderTypeToggle";
import { isValidNumberInput } from "../utils/validators";
import { useOrderForm } from "../hooks/useOderForm";
import { toast } from "sonner";
import { useEffect, useRef } from "react";
import { OrderFormInput } from "./OrderFormInput";

interface OrderFormProps {
  asset: Asset;
  priceFromOrderbook?: { price: number; side: "BUY" | "SELL" } | null;
}

export function OrderForm({ asset, priceFromOrderbook }: OrderFormProps) {
  const {
    formState,
    errors,
    isSubmitting,
    updateField,
    fillFromOrderbook,
    submitOrder,
  } = useOrderForm(asset);

  const priceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (priceFromOrderbook) {
      fillFromOrderbook(priceFromOrderbook.price, priceFromOrderbook.side);

      if (priceInputRef.current) {
        priceInputRef.current.classList.add("ring-2", "ring-blue-500");
        setTimeout(() => {
          priceInputRef.current?.classList.remove("ring-2", "ring-blue-500");
        }, 1000);
      }

      toast.info("Price filled from Orderbook", {
        description: `${
          priceFromOrderbook.side
        } at $${priceFromOrderbook.price.toFixed(2)}`,
        duration: 2000,
      });
    }
  }, [priceFromOrderbook, fillFromOrderbook]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await submitOrder();
      if (response) {
        toast.success("Order placed successfully!", {
          description: `Order ID: ${response.id}`,
        });
      }
    } catch (error) {
      toast.error("Failed to place order", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    }
  };

  const handleNumberInput = (
    field: "price" | "quantity" | "notional",
    value: string
  ) => {
    if (isValidNumberInput(value)) {
      updateField(field, value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Order Type
        </label>
        <OrderTypeToggle
          value={formState.type}
          onChange={(type) => updateField("type", type)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Side
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => updateField("side", "BUY")}
            className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
              formState.side === "BUY"
                ? "bg-green-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => updateField("side", "SELL")}
            className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
              formState.side === "SELL"
                ? "bg-red-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Sell
          </button>
        </div>
      </div>

      {formState.type === "LIMIT" && (
        <OrderFormInput
          ref={priceInputRef}
          label="Price (USD)"
          value={formState.price}
          onChange={(value) => handleNumberInput("price", value)}
          error={errors.price}
        />
      )}

      <OrderFormInput
        label={`Amount (${asset})`}
        value={formState.quantity}
        onChange={(value) => handleNumberInput("quantity", value)}
        error={errors.quantity}
      />

      <OrderFormInput
        label="Total (USD)"
        value={formState.notional}
        onChange={(value) => handleNumberInput("notional", value)}
        error={errors.notional}
        disabled={formState.type === "LIMIT"}
        helperText={
          formState.type === "LIMIT"
            ? "Auto-calculated from price × amount"
            : "Enter the total USD amount you want to trade"
        }
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full px-6 py-3 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed ${
          formState.side === "BUY"
            ? "bg-green-600 hover:bg-green-700 focus:ring-green-500 text-white"
            : "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white"
        }`}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <SubmitOrderAnimation />
            Placing Order...
          </span>
        ) : (
          `${formState.side} ${asset}`
        )}
      </button>
    </form>
  );
}

function SubmitOrderAnimation() {
  return (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
        fill="none"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
