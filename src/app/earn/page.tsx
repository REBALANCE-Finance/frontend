"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAreaChartAllIntervalsWithoutToken } from "@/api/pools/queries";
import { PoolLayout } from "@/layout/PoolLayout";
import { PoolsLending } from "@/pagesComponents/Pools/PoolsLending";
import { IPoolData, IAreaChartData } from "@/api/pools/types";
import { useAccount } from "wagmi";
import { useMediaQuery } from "@chakra-ui/react";
import PoolsLendingTable from "@/pagesComponents/Pools/PoolsLending/Table";
import { useStore } from "@/hooks/useStoreContext";
import { observer } from "mobx-react-lite";
import { getEarnedPoints } from "@/api/points/queries";

const LendingPage = observer(({ params }: { params: { [key: string]: string } }) => {
  const { address } = useAccount();
  const [chartData, setChartData] = useState<any>(null);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDesktop] = useMediaQuery("(min-width: 1130px)");
  const [isTableView, setIsTableView] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [isLoadingPoints, setIsLoadingPoints] = useState(true);
  const {
    pools,
    isLoading: loading,
    error: poolsError,
    fetchPools,
    startPolling,
    stopPolling
  } = useStore("poolsStore");

  useEffect(() => {
    fetchPools("lending");
    startPolling("lending");

    return () => {
      stopPolling();
    };
  }, [fetchPools, startPolling, stopPolling]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsChartLoading(true);
        const token =
          pools?.find(item => item.rebalancerAddress === params.poolAddress)?.token ?? "USDC.e";
        if (token) {
          let fetchedChartData;
          if (address) {
            fetchedChartData = await getAreaChartAllIntervalsWithoutToken(address);
          } else {
            fetchedChartData = await getAreaChartAllIntervalsWithoutToken();
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
  }, [params.poolAddress, address, pools]);

  useEffect(() => {
    if (!isDesktop) {
      setIsTableView(false);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (address) {
      const fetchPoints = async () => {
        const points = await getEarnedPoints(address).finally(() => setIsLoadingPoints(false));
        setEarnedPoints(points);
      };

      fetchPoints();
    }
  }, [address]);

  return (
    <PoolLayout
      pools={pools}
      chartData={chartData}
      loading={loading || isChartLoading}
      error={error}
      isTable={isTableView}
      onChangeView={() => setIsTableView(!isTableView)}
      earnedPoints={earnedPoints}
      isLoadingPoints={isLoadingPoints}
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
