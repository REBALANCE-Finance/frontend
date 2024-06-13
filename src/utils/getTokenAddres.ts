// utils/getTokenAddresses.ts
import axios from 'axios';

export interface TokenAddresses {
  [symbol: string]: string;
}

export const getTokenAddresses = async (): Promise<TokenAddresses> => {
  const url = "https://apiv5.paraswap.io/v2/tokens/arbitrum";
  try {
    const response = await axios.get(url);
    const data = response.data;
    const tokenAddresses: TokenAddresses = {};

    data.tokens.forEach((token: any) => {
      const symbol = token.symbol;
      const address = token.address;
      tokenAddresses[symbol] = address;
    });

    return tokenAddresses;
  } catch (error) {
    console.error(`Error fetching token addresses: ${error}`);
    return {};
  }
};
