import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useReadContract } from "wagmi";

import { ABI_REBALANCE } from "../abi/rebalance";

export const useBalanceOfAsset = (contractAddress: `0x${string}`, ownerAddress: `0x${string}`, decimals: number) => {
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { data, isLoading: loading, refetch } = useReadContract({
    address: contractAddress,
    abi: ABI_REBALANCE,
    functionName: "balanceOfAsset",
    args: [ownerAddress]
  });

  useEffect(() => {
    if (data) {
      const formattedBalance = ethers.formatUnits(data, decimals);
      setBalance(+formattedBalance);
    } else {
      setBalance(0);
    }
    setIsLoading(loading);
  }, [data, loading, decimals]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch(); // Эта функция вызывается для повторного получения данных контракта
    }, 10000); // интервал в миллисекундах (10000 мс = 10 с)

    return () => clearInterval(interval); // Очистка интервала при размонтировании компонента
  }, [refetch]);

  return { balance, isLoading };
};