"use client";
import { observer } from "mobx-react-lite";
import { LendingAsset } from "@/pagesComponents/AssetsPages/LendingAsset";
import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStoreContext";
import { useAccount, useSwitchChain } from "wagmi";
import { arbitrum, bsc } from "viem/chains";

const LendingAssetPage = observer(({ params }: { params: { [key: string]: string } }) => {
  const { chainId, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();
  const {
    activePool,
    setActivePool,
    fetchAndSetActivePool,
    fetchChartData,
    chartData,
    isChartLoading
  } = useStore("poolStore");
  const { setActiveChain } = useStore("poolsStore");
  const { pools, isLoading } = useStore("poolsStore");
  const [error, setError] = useState<string | null>(null);

  const chainName = params.chain === "bsc" ? "BSC" : "Arbitrum";

  useEffect(() => {
    if (params.chain === "arb") {
      setActiveChain("Arbitrum");
    }

    if (params.chain === "bsc") {
      setActiveChain("BSC");
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isConnected) {
      if (params.chain === "arb" && chainId !== arbitrum.id) {
        timer = setTimeout(() => {
          switchChain({ chainId: arbitrum.id });
        }, 500);
      }

      if (params.chain === "bsc" && chainId !== bsc.id) {
        timer = setTimeout(() => {
          switchChain({ chainId: bsc.id });
        }, 500);
      }
    }

    return () => clearTimeout(timer);
  }, [isConnected, chainId]);

  useEffect(() => {
    if (!activePool) {
      fetchAndSetActivePool("lending", params.poolToken, chainName);
    }
  }, [activePool]);

  useEffect(() => {
    if (!activePool && pools.length > 0 && !isLoading) {
      const pool = pools.find(pool => pool?.token === params.poolToken);

      if (pool) {
        setActivePool(pool);
      }
    }
  }, [activePool, pools.length, isLoading]);

  useEffect(() => {
    if (activePool) {
      const token = activePool.token;
      fetchChartData(token, chainName);
    }
  }, [params.poolToken, activePool]);

  return (
    <LendingAsset
      pool={activePool}
      chartData={chartData}
      loading={!activePool}
      error={error}
      isChartLoading={isChartLoading}
      poolChainId={params.chain === "bsc" ? bsc.id : arbitrum.id}
      chainName={params.chain === "arb" ? "Arbitrum" : "BSC"}
    />
  );
});

export default LendingAssetPage;
