/**
 * Generic number validator
 */
export function validateCurrentValue(
  value: string,
  fieldName: string
): string | undefined {
  if (!value || value.trim() === "") {
    return `${fieldName} is required`;
  }

  const num = parseFloat(value);

  if (isNaN(num)) {
    return `${fieldName} must be a valid number`;
  }

  if (num <= 0) {
    return `${fieldName} must be greater than zero`;
  }

  return undefined;
}

/**
 * Check if string is a valid number input
 */
export function isValidNumberInput(value: string): boolean {
  if (value === "" || value === ".") return true;
  return /^\d*\.?\d*$/.test(value);
}
