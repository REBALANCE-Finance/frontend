import axios from "axios";
import { IPrices } from "./types";

export const getPrices = async (
  address: string | undefined,
  from: number,
  to: number
) => {
  const { data } = await axios.get<IPrices>(
    `https://api.coingecko.com/api/v3/coins/arbitrum-one/contract/${address}/market_chart/range?vs_currency=usd&from=${from}&to=${to}`
  );

  return data;
};
