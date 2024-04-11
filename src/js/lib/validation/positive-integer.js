export const isPositiveInteger = (input) => {
  if (!/^\d+$/.test(input)) {
    return false; // Si contiene algo más que dígitos, no es un número entero positivo
  }
  const number = Number(input);
  return Number.isInteger(number) && number > 0;
}