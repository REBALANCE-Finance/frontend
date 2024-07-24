import axios from "axios";

export const getPrices = async (
  srcToken: string,
  destToken: string,
  amount: number,
  network: number,
  srcDecimals: number,
  destDecimals: number
) => {
  const amountInSrcTokenUnits = (amount * Math.pow(10, srcDecimals)).toFixed(0); // Преобразование суммы в минимальные единицы токена
  const url = `https://apiv5.paraswap.io/prices/?srcToken=${srcToken}&destToken=${destToken}&amount=${amountInSrcTokenUnits}&side=SELL&network=${network}&srcDecimals=${srcDecimals}&destDecimals=${destDecimals}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error("Error fetching swap rates:", error);
    throw error;
  }
};

export const getSwapRoute = async (
  srcToken: string,
  destToken: string,
  amount: number,
  network: number,
  srcDecimals: number,
  destDecimals: number,
  userAddress: string
) => {
  const amountInSrcTokenUnits = (amount * Math.pow(10, srcDecimals)).toFixed(0); // Convert amount to smallest token units
  const url = `https://apiv5.paraswap.io/prices/?srcToken=${srcToken}&destToken=${destToken}&amount=${amountInSrcTokenUnits}&side=SELL&network=${network}&srcDecimals=${srcDecimals}&destDecimals=${destDecimals}&partner=paraswap`;

  try {
    const { data } = await axios.get(url);
    const priceRoute = data.priceRoute;
    return priceRoute;
  } catch (error) {
    console.error("Error fetching swap route:", error);
    throw error;
  }
};

export const buildTransaction = async (priceRoute: any, userAddress: string, network: number) => {
  const url = `https://apiv5.paraswap.io/transactions/${network}`;

  const params = {
    priceRoute,
    srcToken: priceRoute.srcToken,
    destToken: priceRoute.destToken,
    srcAmount: priceRoute.srcAmount,
    destAmount: priceRoute.destAmount,
    userAddress,
    partner: "rebalance"
  };

  try {
    const { data } = await axios.post(url, params);
    return data;
  } catch (error) {
    console.error("Error building transaction:", error);
    throw error;
  }
};

export const getParaswapSwapTransaction = async (
  srcToken: string,
  destToken: string,
  amount: number,
  network: number,
  srcDecimals: number,
  destDecimals: number,
  userAddress: string
) => {
  try {
    const priceRoute = await getSwapRoute(
      srcToken,
      destToken,
      amount,
      network,
      srcDecimals,
      destDecimals,
      userAddress
    );

    const transaction = await buildTransaction(priceRoute, userAddress, network);

    return transaction;
  } catch (error) {
    console.error("Error in swapTokens:", error);
    throw error;
  }
};
