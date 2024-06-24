import axios from "axios";
import { IToken } from "@/api/tokens/types";

export interface TokenAddresses {
  [key: string]: IToken;
}

export const getTokenAddresses = async (): Promise<TokenAddresses> => {
  const response = await axios.get("https://api.example.com/tokens");
  const data = response.data.tokens;

  const tokenAddresses: TokenAddresses = {};

  data.forEach((token: IToken) => {
    tokenAddresses[token.symbol] = token;
  });

  return tokenAddresses;
};
