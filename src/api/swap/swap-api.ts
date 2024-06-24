import axios from "axios";

export interface IPrices {
  prices: number[][];
  market_caps: number[][];
  total_volumes: number[][];
}

export const getPrices = async (address: string | undefined, from: number, to: number): Promise<IPrices> => {
  const srcToken = address; // Исходный токен
  const destToken = address; // Целевой токен
  const amount = from.toString(); // Сумма исходного токена
  const url = `https://apiv5.paraswap.io/prices/?srcToken=${srcToken}&destToken=${destToken}&amount=${amount}&side=SELL&network=${to}`;

  try {
    const { data } = await axios.get(url);
    return data as IPrices;
  } catch (error) {
    console.error('Error fetching swap rates:', error);
    throw error;
  }
};
