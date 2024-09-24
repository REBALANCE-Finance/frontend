"use client";
import { useEffect, useMemo, useState } from "react";
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
import { performWagmiChainName } from "@/utils";

const LendingPage = observer(({ params }: { params: { [key: string]: string } }) => {
  const { address, chain } = useAccount();
  const [chartData, setChartData] = useState<any>(null);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDesktop] = useMediaQuery("(min-width: 1130px)");
  const [isTableView, setIsTableView] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [isLoadingPoints, setIsLoadingPoints] = useState(true);
  const {
    pools,
    isFetched: isFetchedPools,
    error: poolsError,
    fetchPools,
    startPolling,
    stopPolling
  } = useStore("poolsStore");

  const chainName = useMemo(() => {
    return performWagmiChainName(chain?.name || "Arbitrum");
  }, [chain?.name]);

  useEffect(() => {
    fetchPools("lending", chainName);
    startPolling("lending", chainName);

    return () => {
      stopPolling();
    };
  }, [fetchPools, startPolling, stopPolling, chain]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsChartLoading(true);
        let fetchedChartData;
        if (address) {
          fetchedChartData = await getAreaChartAllIntervalsWithoutToken(chainName, address);
        } else {
          fetchedChartData = await getAreaChartAllIntervalsWithoutToken(chainName);
        }

        setChartData(fetchedChartData);
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
  }, [params.poolAddress, address]);

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
      loading={isChartLoading}
      error={error}
      isTable={isTableView}
      onChangeView={() => setIsTableView(!isTableView)}
      earnedPoints={earnedPoints}
      isLoadingPoints={isLoadingPoints}
    >
      {isTableView ? (
        <PoolsLendingTable pools={pools} isLoading={!isFetchedPools} error={poolsError?.message} />
      ) : (
        <PoolsLending pools={pools} loading={!isFetchedPools} error={poolsError?.message || ""} />
      )}
    </PoolLayout>
  );
});

export default LendingPage;
