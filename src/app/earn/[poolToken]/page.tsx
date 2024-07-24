"use client";
import { observer } from "mobx-react-lite";
import { getAreaChartAllIntervals, getPools } from "@/api/pools/queries";
import { LendingAsset } from "@/pagesComponents/AssetsPages/LendingAsset";
import { IAreaChartData } from "@/api/pools/types";
import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStoreContext";

const LendingAssetPage = observer(({ params }: { params: { [key: string]: string } }) => {
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

  useEffect(() => {
    if (!activePool) {
      fetchAndSetActivePool("lending", params.poolToken);
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
      fetchChartData(token);
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
