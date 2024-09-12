import { formatUnits } from "ethers";
import { useEffect, useState } from "react";
import { useReadContracts } from "wagmi";

import { ABI_REBALANCE } from "../abi/rebalance";

type Token = {
  contractAddress?: `0x${string}`;
  decimals?: number;
};

export const useBalanceOfAssets = (tokens: Token[], ownerAddress?: `0x${string}`) => {
  const [hasBalance, setHasBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!tokens || ownerAddress === "0x" || !ownerAddress) {
    return { hasBalance, isLoading: false };
  }

  const contracts =
    tokens.length > 0 && ownerAddress !== "0x"
      ? tokens.map(({ contractAddress }) => ({
          address: contractAddress,
          abi: ABI_REBALANCE,
          functionName: "getBalanceOfAsset",
          args: [ownerAddress]
        }))
      : [];

  const {
    data,
    isLoading: loading,
    refetch
  } = useReadContracts({
    contracts,
    query: {
      enabled: tokens.length > 0 && !!ownerAddress && contracts.length > 0
    }
  });

  useEffect(() => {
    if (data) {
      const balances = data.map((result, index) => {
        // @ts-ignore
        const balance = result ? formatUnits(result.result, tokens[index].decimals) : "0";
        return parseFloat(balance);
      });

      setHasBalance(balances.some(balance => balance > 0));
    }

    setIsLoading(loading);
  }, [data, loading, tokens]);

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 3000);

    return () => clearInterval(interval);
  }, [refetch]);

  return { hasBalance, isLoading };
};
