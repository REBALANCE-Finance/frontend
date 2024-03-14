import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

import { ABI_REBALANCE } from "../abi/rebalance";

export const useBalanceOfAsset = (contractAddress: `0x${string}`, ownerAddress: `0x${string}`) => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { data, isLoading: loading } = useReadContract({
    address: contractAddress,
    abi: ABI_REBALANCE,
    functionName: "balanceOf",
    args: [ownerAddress]
  });

  useEffect(() => {
    if (data) {
      const formattedBalance = ethers.formatUnits(data, 6);
      setBalance(+formattedBalance);
      console.log(formattedBalance, "data");
    } else {
      setBalance(0);
    }
    setIsLoading(loading);
  }, [data, loading]);

  return { balance, isLoading };
};
