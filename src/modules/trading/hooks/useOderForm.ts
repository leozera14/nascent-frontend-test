"use client";

import { useState, useCallback, useEffect } from "react";
import { Asset } from "@/config/constants";
import { sendTrade } from "../lib";
import { FormErrors, OrderFormState } from "../types";
import { validateCurrentValue } from "../utils/validators";

export function useOrderForm(asset: Asset) {
  const [formState, setFormState] = useState<OrderFormState>({
    side: "BUY",
    type: "LIMIT",
    price: "",
    quantity: "",
    notional: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const price = parseFloat(formState.price);
    const quantity = parseFloat(formState.quantity);

    const canNotProceed =
      !formState.price ||
      !formState.quantity ||
      price === 0 ||
      quantity === 0 ||
      isNaN(price) ||
      isNaN(quantity);

    if (canNotProceed) {
      setFormState((prev) => ({ ...prev, notional: "" }));
      return;
    }

    const notional = (price * quantity).toFixed(2);

    setFormState((prev) => ({ ...prev, notional }));
  }, [formState.price, formState.quantity]);

  const updateField = useCallback(
    (field: keyof OrderFormState, value: string) => {
      setFormState((prev) => ({ ...prev, [field]: value }));

      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    },
    [errors]
  );

  const validate = useCallback((): boolean => {
    const validations = {
      quantity: validateCurrentValue(formState.quantity, "Amount"),
      notional: validateCurrentValue(formState.notional, "Total"),
      ...(formState.type === "LIMIT" && {
        price: validateCurrentValue(formState.price, "Price"),
      }),
    };

    const newErrors = Object.fromEntries(
      Object.entries(validations).filter(([_, error]) => error !== undefined)
    ) as FormErrors;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formState]);

  const submitOrder = useCallback(async () => {
    if (!validate()) return null;

    setIsSubmitting(true);

    try {
      const tradeData = {
        asset,
        side: formState.side,
        type: formState.type,
        quantity: parseFloat(formState.quantity),
        price:
          formState.type === "LIMIT" ? parseFloat(formState.price) : undefined,
        notional: parseFloat(formState.notional),
      };

      const response = await sendTrade(tradeData);

      setFormState({
        side: formState.side,
        type: formState.type,
        price: "",
        quantity: "",
        notional: "",
      });

      return response;
    } catch (error) {
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [asset, formState, validate]);

  return {
    formState,
    errors,
    isSubmitting,
    updateField,
    submitOrder,
  };
}
