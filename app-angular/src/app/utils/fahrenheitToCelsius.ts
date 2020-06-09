export const fahrenheitToCelsius = (fahrenheit: number): number => {
    return Number(((fahrenheit - 32) * 5 / 9).toFixed(2));
}