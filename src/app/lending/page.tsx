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

const LendingPage = ({ params }: { params: { [key: string]: string } }) => {
  const router = useRouter();
  const { isConnected } = useAccount();
  const [pools, setPools] = useState<IPoolData[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDesktop] = useMediaQuery("(min-width: 1130px)");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsChartLoading(true);
        const fetchedPools = await getPools("lending");
        setPools(fetchedPools);
        const token =
          fetchedPools?.find(item => item.rebalancerAddress === params.poolAddress)?.token ||
          fetchedPools[0]?.token;
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
        setLoading(false);
        setIsChartLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Ошибка при загрузке данных:", err);
          setError(err.message);
        } else {
          console.error("Неизвестная ошибка:", err);
          setError("Произошла неизвестная ошибка");
        }
        setLoading(false);
        setIsChartLoading(false);
      }
    };

    fetchData();
  }, [params.poolAddress, isConnected]);

  return (
    <PoolLayout
      pools={pools}
      chartData={chartData}
      loading={loading || isChartLoading}
      error={error}
    >
      {isDesktop ? (
        <PoolsLendingTable pools={pools} isLoading={loading} error={error} />
      ) : (
        <PoolsLending pools={pools} loading={loading} error={error} />
      )}
    </PoolLayout>
  );
};

export default LendingPage;
