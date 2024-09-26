enum ExplorerType {
  address = "address",
  token = "token"
}

interface IFinalExplorerUrl {
  url: string | undefined;
  address: string | undefined;
  type: keyof typeof ExplorerType;
}

export const getFinalExplorerUrl = ({ url, address, type }: IFinalExplorerUrl) => {
  if (!url || !address) return "";
  return `${url}/${type}/${address}`;
};
