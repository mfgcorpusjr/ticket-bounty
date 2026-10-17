export const toCent = (value: number) => {
  return value * 100;
};

export const fromCent = (value: number) => {
  return value / 100;
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};
