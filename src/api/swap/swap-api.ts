import axios from "axios";

export interface IPrices {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

const getPrices = async (address: string | undefined, from: number, to: number): Promise<IPrices> => {
  if (!address) throw new Error("Address is required");
  const response = await axios.get(`https://apiv5.paraswap.io/prices/`, {
    params: {
      from: address,
      to: address, // заменить на адрес токена, с которым вы хотите обменять
      amount: from, // количество, которое вы хотите обменять
      side: 'SELL'
    }
  });
  return response.data;
};