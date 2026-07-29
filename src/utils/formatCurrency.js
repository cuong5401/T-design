export function formatCurrency(value) {
  return `${Number(value || 0).toLocaleString("ja-JP")}円`;
}

export function parseCurrency(value) {
  const numeric = String(value || "").replace(/[^\d]/g, "");
  return numeric ? Number(numeric) : 0;
}
