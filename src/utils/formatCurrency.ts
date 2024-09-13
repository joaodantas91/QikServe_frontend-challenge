export function formatCurrency (amount: number, locale: string, currency: string): string {
  return amount.toLocaleString(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}