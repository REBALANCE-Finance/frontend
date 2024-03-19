export interface IPoolData {
  token: string;
  tokenAddress: string;
  rebalancerAddress: string;
  tokenPriceInUsd: number;
  tokenPrice24HrChangeInPercentages: number;
  tokenPrice24HrChangeInUsd: number;
  apr: number;
  funds: number;
  avgApr: number;
  earned: number;
  decimals: number;
  deposit: number;
  risk: number;
  borrowRate: number;
  borrowed: number;
}
export interface IPoolsData {
  token: string;
  vaultAddress: string;
  tokenAddress: string;
  tokeDecimals: number;
  tokenPrice: number;
  funds: number;
  earned: number;
  avgApr30D: number;
  highestMarket30DAvgAprDiffPercentage: number;
}
