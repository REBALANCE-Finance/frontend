import axios from "axios";

export const getPrices = async (srcToken: string, destToken: string, amount: number, network: number, srcDecimals: number, destDecimals: number) => {
  const amountInSrcTokenUnits = (amount * Math.pow(10, srcDecimals)).toFixed(0); // Преобразование суммы в минимальные единицы токена
  const url = `https://apiv5.paraswap.io/prices/?srcToken=${srcToken}&destToken=${destToken}&amount=${amountInSrcTokenUnits}&side=SELL&network=${network}&srcDecimals=${srcDecimals}&destDecimals=${destDecimals}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching swap rates:', error);
    throw error;
  }
};
