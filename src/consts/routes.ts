export const ROUTE_PATHS = {
  lending: "/earn",
  borrowing: "/borrowing",
  lendingAsset: "/earn/:poolToken",
  lendingAssetPage: (token: string) => `/earn/${token}`,
  borrowingAsset: "/borrowing/:poolToken",
  swap: "/swap",
  swapPage: (inputToken: string, outputToken: string) => `/swap?input=${inputToken}&output=${outputToken}`,
};
