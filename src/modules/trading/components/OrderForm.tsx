"use client";

import { Asset } from "@/config/constants";
import { OrderTypeToggle } from "./OrderTypeToggle";
import { isValidNumberInput } from "../utils/validators";
import { useOrderForm } from "../hooks/useOderForm";
import { toast } from "sonner";

interface OrderFormProps {
  asset: Asset;
}

export function OrderForm({ asset }: OrderFormProps) {
  const { formState, errors, isSubmitting, updateField, submitOrder } =
    useOrderForm(asset);

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
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Price (USD)
          </label>
          <input
            type="text"
            value={formState.price}
            onChange={(e) => handleNumberInput("price", e.target.value)}
            placeholder="0.00"
            className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
              errors.price
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-700 focus:ring-blue-500"
            }`}
          />
          {errors.price && (
            <p className="mt-1 text-sm text-red-400">{errors.price}</p>
          )}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Amount ({asset})
        </label>
        <input
          type="text"
          value={formState.quantity}
          onChange={(e) => handleNumberInput("quantity", e.target.value)}
          placeholder="0.00"
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
            errors.quantity
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:ring-blue-500"
          }`}
        />
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-400">{errors.quantity}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Total (USD)
        </label>
        <input
          type="text"
          value={formState.notional}
          onChange={(e) => handleNumberInput("notional", e.target.value)}
          placeholder="0.00"
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${
            errors.notional
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:ring-blue-500"
          }`}
          disabled={formState.type === "LIMIT"}
        />
        {errors.notional && (
          <p className="mt-1 text-sm text-red-400">{errors.notional}</p>
        )}
        {formState.type === "LIMIT" && (
          <p className="mt-1 text-xs text-gray-500">
            Auto-calculated from price × amount
          </p>
        )}
      </div>

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
            Placing Order...
          </span>
        ) : (
          `${formState.side} ${asset}`
        )}
      </button>
    </form>
  );
}
