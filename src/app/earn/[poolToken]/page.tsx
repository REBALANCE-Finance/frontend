"use client";
import { observer } from "mobx-react-lite";
import { getAreaChartAllIntervals, getPools } from "@/api/pools/queries";
import { LendingAsset } from "@/pagesComponents/AssetsPages/LendingAsset";
import { IAreaChartData } from "@/api/pools/types";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/hooks/useStoreContext";
import { useAccount } from "wagmi";
import { performWagmiChainName } from "@/utils";

const LendingAssetPage = observer(({ params }: { params: { [key: string]: string } }) => {
  const { chain } = useAccount();
  const {
    activePool,
    setActivePool,
    fetchAndSetActivePool,
    fetchChartData,
    chartData,
    isChartLoading
  } = useStore("poolStore");
  const { pools, isLoading } = useStore("poolsStore");
  const [error, setError] = useState<string | null>(null);

  const chainName = useMemo(() => {
    return performWagmiChainName(chain?.name || "Arbitrum");
  }, [chain?.name]);

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
    />
  );
});

export default LendingAssetPage;
