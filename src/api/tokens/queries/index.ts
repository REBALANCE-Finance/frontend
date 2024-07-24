import { useQuery } from "@tanstack/react-query";
import { getTokenList } from "../token-api";
import { IToken } from "../types";

export const useGetTokenList = (chainId: number | undefined, needRefetch?: boolean) => {
  return useQuery({
    queryKey: needRefetch ? ["token-list", needRefetch] : ["token-list"],
    queryFn: getTokenList,
    enabled: !!chainId,
    staleTime: Infinity,
    // onError: (err) => {
    //   console.log(err);
    // },
    select: (data): IToken[] => {
      return data.tokens?.filter((token: IToken) => token?.chainId === chainId) ?? null;
    }
  });
};
