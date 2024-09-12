export const getIdByToken = (token: string) => {
  switch (token) {
    case "USDC":
      return "USDC";
    case "USDC.e":
      return "USDCe";
    case "DAI":
      return "DAI";
    case "wETH":
      return "wETH";
    case "FRAX":
      return "Frax";
    default:
      return "USDT";
  }
};
