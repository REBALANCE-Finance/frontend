"use client";
import { observer } from "mobx-react-lite";
import { getAreaChartAllIntervals, getPools } from "@/api/pools/queries";
import { LendingAsset } from "@/pagesComponents/AssetsPages/LendingAsset";
import { IPoolData, IAreaChartData } from "@/api/pools/types";
import { useEffect, useState } from "react";
import { useStore } from "@/hooks/useStoreContext";import { toJS } from "mobx";

const LendingAssetPage = observer(({ params }: { params: { [key: string]: string } }) => {
  const { activePool, setActivePool } = useStore("poolStore");
  const { fetchPools, pools, isLoading } = useStore("poolsStore");
  const [chartData, setChartData] = useState<IAreaChartData | null>(null);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activePool) {
      fetchPools("lending");
    }
  }, [activePool, pools]);

  useEffect(() => {
    if (!activePool && pools.length > 0 && !isLoading) {
      const pool = pools.find(pool => pool?.token === params.poolToken);
      if (pool) {
        setActivePool(pool);
      }
    }
  }, [activePool, pools.length, isLoading]);

  const fetchChartData = async (token: string) => {
    try {
      setIsChartLoading(true);
      const chartData = await getAreaChartAllIntervals(token);
      if (!chartData) {
        throw new Error("Failed to fetch chart data");
      }
      return chartData;
    } catch (err) {
      throw new Error(
        "Failed to fetch chart data: " + (err instanceof Error ? err.message : "Unknown error")
      );
    } finally {
      setIsChartLoading(false);
    }
  };

  useEffect(() => {
    if (activePool) {
      const fetchData = async () => {
        try {
          const token = activePool.token;
          if (!token) {
            throw new Error("Token not found for the provided pool address");
          }

          const chartData = await fetchChartData(token);
          setChartData(chartData);
        } catch (err) {
          console.error("Error loading lending asset page:", err);
          setError(err instanceof Error ? err.message : "An unknown error occurred");
        }
      };

      fetchData();
    }
  }, [params.poolToken, activePool]);

  return (
    <LendingAsset
      pool={activePool}
      chartData={chartData}
      loading={isLoading}
      error={error}
      isChartLoading={isChartLoading}
    />
  );
});

export default LendingAssetPage;
