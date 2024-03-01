import numeral from "numeral";

export const formatNumber = (value: string | number) => {
  if (value === undefined || Number(value) < 0.000001) return "0";
  const numValue = Number(value);
  if (numValue >= 10 ** 9) {
    return `${numeral(numValue / 10 ** 9).format("0.0")}B`;
  } else if (numValue >= 1000000) {
    return `${numeral(numValue / 1000000).format("0,0.[00]")}M`;
  } else if (numValue >= 100000) {
    return `${numeral(numValue / 1000).format("0,00.[00]")}K`;
  } else if (numValue < 1) {
    return numeral(numValue).format("0.[000000]");
  } else {
    return numeral(numValue).format("0,0.[0000]");
  }
};

export const formatPercent = (value: string | number) => {
  if (value === undefined) return "0";
  const numValue = Number(value);
  if (numValue < 0) return `${numeral(numValue).format("0.[0]")}%`;
  return `+${numeral(numValue).format("0.[0]")}%`;
};
