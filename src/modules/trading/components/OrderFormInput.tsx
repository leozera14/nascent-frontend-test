import { forwardRef } from "react";

interface FormInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  helperText?: string;
  type?: "text" | "number";
}

export const OrderFormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      label,
      value,
      onChange,
      placeholder = "0.00",
      error,
      disabled = false,
      helperText,
      type = "text",
    },
    ref
  ) => {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          {label}
        </label>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full px-4 py-3 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:ring-blue-500"
          }`}
        />
        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-1 text-xs text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

OrderFormInput.displayName = "OrderFormInput";
