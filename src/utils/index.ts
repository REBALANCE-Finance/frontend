import BigDecimal from "decimal.js-light";
import { BIG_1E18, BIG_1E6, BIG_1E8, BIG_1E9 } from "@/consts";

export const ellipsis = (string: string, chars = 4) => {
  if (!string) return "";
  return `${string.substring(0, chars)}...${string.substring(string.length - chars)}`;
};

export const getValueByDecimal = (decimals: number) => {
  switch (decimals) {
    case 6:
      return BIG_1E6;
    case 8:
      return BIG_1E8;
    case 9:
      return BIG_1E9;
    default:
      return BIG_1E18;
  }
};

export const convertBigIntToNumber = (value: bigint | unknown, decimals: number = 1) => {
  if (!value) {
    return 0;
  }
  const val = typeof value === "bigint" ? value?.toString() : value;

  return +val / getValueByDecimal(decimals);
};

export const performApprovedAmountValue = (value: bigint | undefined, decimals: number) => {
  if (!value) return 0;

  return convertBigIntToNumber(value, decimals);
};

export const convertNumberToBigInt = (value: number = 0, decimals: number): bigint => {
  return BigInt(Math.round(value * Math.pow(10, decimals)));
};

export const getExplorerTxLink = (txHash: string) => {
  return `https://arbiscan.io/tx/${txHash}`;
};

export const scrollToElement = (id: string) => {
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
};

export const formatSharesNumber = (numStr: string): string => {
  const validNumber = parseFloat(numStr);

  const flooredNumber = Math.floor(validNumber * 10 ** 5) / 10 ** 5;

  return flooredNumber.toFixed(5);
};

export function getDaysLeft(unlockTime: number, duration: number): string {
  const currentTime = Math.floor(Date.now() / 1000);

  if (unlockTime <= currentTime) {
    return "0 / 0 days";
  }

  const secondsLeft = unlockTime - currentTime;
  const daysLeft = Math.ceil(secondsLeft / (60 * 60 * 24));

  const totalDays = Math.ceil(duration / (60 * 60 * 24));

  return `${daysLeft} / ${totalDays} days`;
}

export function isUnlocked(unlockTime: number): boolean {
  const currentTime = Math.floor(Date.now() / 1000);
  return currentTime >= unlockTime;
}
