import axios from "axios";

export const getTokenList = async () => {
  const { data } = await axios.get(
    "https://ipfs.io/ipns/tokens.uniswap.org"
  );

  return data;
};