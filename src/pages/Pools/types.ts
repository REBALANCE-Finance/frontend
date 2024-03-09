import { DefaultDataType } from "../../types";

export enum RowCardNames {
  header = "header",
  body = "body",
  footer = "footer"
}

export enum RowCardProccessType {
  assets = "assets",
  metrics = "metrics"
}

export type RowCardProccess = {
  item: DefaultDataType;
  type?: keyof typeof RowCardProccessType;
};

export interface IRowCard {
  name: keyof typeof RowCardNames;
  proccess?: ({ item, type }: RowCardProccess) => JSX.Element | undefined;
}
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
