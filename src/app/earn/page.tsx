"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAreaChartAllIntervals, getPools } from "@/api/pools/queries";
import { PoolLayout } from "@/layout/PoolLayout";
import { PoolsLending } from "@/pagesComponents/Pools/PoolsLending";
import { IPoolData, IAreaChartData } from "@/api/pools/types";
import { useAccount } from "wagmi";
import { useMediaQuery } from "@chakra-ui/react";
import PoolsLendingTable from "@/pagesComponents/Pools/PoolsLending/Table";
import { useStore } from "@/hooks/useStoreContext";
import { observer } from "mobx-react-lite";

const LendingPage = observer(({ params }: { params: { [key: string]: string } }) => {
  const { isConnected } = useAccount();
  const [chartData, setChartData] = useState<any>(null);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDesktop] = useMediaQuery("(min-width: 1130px)");
  const [isTableView, setIsTableView] = useState(false);
  const { pools, isLoading: loading, error: poolsError, fetchPools } = useStore("poolsStore");

  useEffect(() => {
    fetchPools("lending");
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsChartLoading(true);
        const token =
          pools.find(item => item.rebalancerAddress === params.poolAddress)?.token ||
          pools[0]?.token;
        if (token) {
          let fetchedChartData = await getAreaChartAllIntervals(token);

          const intervals = ["1m", "6m", "1y"];
          if (isConnected) {
            intervals.forEach(interval => {
              // @ts-ignore
              fetchedChartData.chartData[interval] = fetchedChartData.chartData[interval].map(
                (dataPoint: any, index: number) => ({
                  ...dataPoint,
                  hardcodedLine: index * 1.1
                })
              );
            });
          }

          setChartData(fetchedChartData);
        } else {
          throw new Error("Invalid pool address or token not found");
        }
        setIsChartLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Ошибка при загрузке данных:", err);
          setError(err.message);
        } else {
          console.error("Неизвестная ошибка:", err);
          setError("Произошла неизвестная ошибка");
        }
        setIsChartLoading(false);
      }
    };

    fetchData();
  }, [params.poolAddress, isConnected]);

  useEffect(() => {
    if (!isDesktop) {
      setIsTableView(false);
    }
  }, [isDesktop]);

  return (
    <PoolLayout
      pools={pools}
      chartData={chartData}
      loading={loading || isChartLoading}
      error={error}
      isTable={isTableView}
      onChangeView={() => setIsTableView(!isTableView)}
    >
      {isTableView ? (
        <PoolsLendingTable pools={pools} isLoading={loading} error={poolsError?.message} />
      ) : (
        <PoolsLending pools={pools} loading={loading} error={poolsError?.message || ""} />
      )}
    </PoolLayout>
  );
});

export default LendingPage;
