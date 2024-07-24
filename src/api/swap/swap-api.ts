import { useQuery } from "@tanstack/react-query";
import { IPrices } from "./types";
import { getPrices } from "./queries";

export const useGetPrice = (
  srcToken: string | undefined,
  destToken: string | undefined,
  amount: number,
  network: number,
  srcDecimals: number,
  destDecimals: number,
  needRefetch?: boolean,
) => {
  return useQuery<IPrices>({
    queryKey: ["prices", srcToken, destToken, amount, network, srcDecimals, destDecimals],
    queryFn: () => getPrices(srcToken!, destToken!, amount, network, srcDecimals, destDecimals),
    enabled: !!srcToken && !!destToken && amount > 0 && needRefetch,
    retry: 1
  });
};
