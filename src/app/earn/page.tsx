"use client";
import { useEffect, useState } from "react";
import { getAreaChartAllIntervalsWithoutToken } from "@/api/pools/queries";
import { PoolLayout } from "@/layout/PoolLayout";
import { PoolsLending } from "@/pagesComponents/Pools/PoolsLending";
import { useAccount } from "wagmi";
import { useMediaQuery } from "@chakra-ui/react";
import PoolsLendingTable from "@/pagesComponents/Pools/PoolsLending/Table";
import { useStore } from "@/hooks/useStoreContext";
import { observer } from "mobx-react-lite";
import { getEarnedPoints } from "@/api/points/queries";

const LendingPage = observer(({ params }: { params: { [key: string]: string } }) => {
  const { address, chain } = useAccount();
  const [chartData, setChartData] = useState<any>(null);
  const [isChartLoading, setIsChartLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDesktop] = useMediaQuery("(min-width: 1130px)");
  const [isTableView, setIsTableView] = useState(false);
  const {
    pools,
    isFetched: isFetchedPools,
    error: poolsError,
    fetchPools,
    startPolling,
    stopPolling,
    activeChain
  } = useStore("poolsStore");

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPools("lending", activeChain);
      startPolling("lending", activeChain);
    }, 300);

    return () => {
      stopPolling();
      clearTimeout(timer);
    };
  }, [fetchPools, startPolling, stopPolling, activeChain]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsChartLoading(true);
        let fetchedChartData;
        if (address) {
          fetchedChartData = await getAreaChartAllIntervalsWithoutToken(activeChain, address);
        } else {
          fetchedChartData = await getAreaChartAllIntervalsWithoutToken(activeChain);
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

    const timer = setTimeout(() => {
      fetchData();
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [params.poolAddress, address, activeChain]);

  useEffect(() => {
    if (!isDesktop) {
      setIsTableView(false);
    }
  }, [isDesktop]);

  return (
    <PoolLayout
      pools={pools}
      chartData={chartData}
      loading={isChartLoading}
      error={error}
      isTable={isTableView}
      onChangeView={() => setIsTableView(!isTableView)}
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
