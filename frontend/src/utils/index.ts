// Formata o valor para moeda
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

// Formata o valor para número (sem R$)
export const formatCurrencyAsNumber = (value: string) => {
  // Remove todos os caracteres que não são números
  const digits = value.replace(/\D/g, "");

  // Converte o valor para número
  const amountAsNumber = Number(digits) / 100;

  // Retorna o valor formatado
  return amountAsNumber.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Retorna as iniciais do nome
export function getNameInitials(name: string | undefined): string {
  // Se o nome for undefined, retorna "??"
  if (!name) return "??";

  // Remove espaços em branco e converte para maiúsculo
  const cleanedName = name.trim().toUpperCase();

  // Divide o nome em palavras
  const words = cleanedName.split(/\s+/);

  // Se o nome for vazio, retorna "??"
  if (words.length == 0) return "??";

  // Se o nome tiver apenas uma palavra, retorna as duas primeiras letras
  if (words.length == 1) return words[0].substring(0, 2);

  // Retorna a primeira e a última letra do nome
  const firstLetter = words[0].charAt(0);
  const lastLetter = words[words.length - 1].charAt(0);

  // Concatena a primeira e a última letra
  return `${firstLetter}${lastLetter}`;
}

// Verifica se o token expirou
export function isTokenExpired(token: string): boolean {
  try {
    // Decodifica o token
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    // Verifica se o token expirou
    return payload.exp * 1000 < Date.now();

  } catch {
    // Se o token não for válido, retorna true
    return true;
  }
}