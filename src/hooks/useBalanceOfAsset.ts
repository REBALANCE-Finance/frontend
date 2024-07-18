import { formatUnits } from "ethers";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

import { ABI_REBALANCE } from "../abi/rebalance";

export const useBalanceOfAsset = (
  contractAddress: `0x${string}`,
  ownerAddress: `0x${string}`,
  decimals: number
) => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const {
    data,
    isLoading: loading,
    refetch,
  } = useReadContract({
    address: contractAddress,
    abi: ABI_REBALANCE,
    functionName: "getBalanceOfAsset",
    args: [ownerAddress]
  });

  useEffect(() => {
    if (data) {
      const formattedBalance = formatUnits(data, decimals);
      setBalance(+formattedBalance);
    }
    setIsLoading(false);
  }, [data, loading, decimals]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 3000);

    return () => clearInterval(interval);
  }, [refetch]);

  return { balance, isLoading };
};
