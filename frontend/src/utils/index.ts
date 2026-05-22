export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const formatCurrencyAsNumber = (value: string) => {
  const digits = value.replace(/\D/g, "");

  const amountAsNumber = Number(digits) / 100;

  return amountAsNumber.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export function getNameInitials(name: string | undefined): string {
  if (!name) return "??";

  const cleanedName = name.trim().toUpperCase();
  const words = cleanedName.split(/\s+/);

  if (words.length == 0) return "??";
  if (words.length == 1) return words[0].substring(0, 2);

  const firstLetter = words[0].charAt(0);
  const lastLetter = words[words.length - 1].charAt(0);

  return `${firstLetter}${lastLetter}`;
}
