import { useQuery } from "@tanstack/react-query";
import { getPrices } from "../swap-api";

export const useGetPrice = (
  address: string | undefined,
  from: number,
  to: number
) => {
  return useQuery({
    queryKey: ["prices", address],
    queryFn: () => getPrices(address, from, to),
    enabled: !!address,
    staleTime: 60000,
    refetchInterval: 60000
  });
};
