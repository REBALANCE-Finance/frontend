import axios from "axios";

export const getTokenList = async () => {
  const { data } = await axios.get(
    "https://tokens.uniswap.org/"
  );

  return data;
};