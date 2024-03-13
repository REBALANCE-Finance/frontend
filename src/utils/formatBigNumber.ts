import { formatUnits, parseUnits } from "viem";

export const formatBigNumber = (value: bigint | undefined, decimals: number | undefined) => {
  if (value === undefined || decimals === undefined) return "0";
  return formatUnits(value, decimals);
};

export const parseBigNumber = (value: string | undefined, decimals: number | undefined) => {
  if (value === undefined || decimals === undefined) return BigInt(0);
  return parseUnits(value, decimals);
};
