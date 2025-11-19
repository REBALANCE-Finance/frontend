"use client";

import { Flex, Skeleton, useMediaQuery } from "@chakra-ui/react";
import { IAreaChartData, IPoolData } from "@/api/pools/types";
import { MEDIA_QUERY_MAX } from "../../consts";
import { RebalancePerformanceCard } from "./RebalancePerformanceCard";
import { PerformanceChart } from "./RebalancePerformanceCharts";
import { getCurrentPath, performanceInfo } from "./utils";
import { usePathname } from "next/navigation";
import { formatNumber } from "@/utils/formatNumber";
import { useEffect, useMemo, useState } from "react";
import { getTotalProfit } from "@/api/pools/queries";
import { useAccount } from "wagmi";
import { observer } from "mobx-react-lite";
import { useStore } from "@/hooks/useStoreContext";

export const RebalancePerformance = observer(
  ({
    pools,
    chartData,
    loading
  }: {
    pools: IPoolData[];
    chartData: IAreaChartData;
    loading: boolean;
  }) => {
    const location = usePathname();
    const { address, chain } = useAccount();
    const pathName = getCurrentPath(location || "");
    const [media] = useMediaQuery(MEDIA_QUERY_MAX);
    const totalLending = pools.reduce((acc, pool) => acc + (pool?.funds || 0), 0);
    const info = {
      lending: { value: formatNumber(totalLending) },
      borrowing: { value: pools[0]?.funds.toFixed(2) }
    };
    const [userProfit, setUserProfit] = useState(0);
    const { activeChain } = useStore("poolsStore");
    const { isDemoMode } = useStore("demoStore");

    useEffect(() => {
      if (address) {
        getTotalProfit("lending", address, activeChain).then(data => {
          setUserProfit(data);
        });
      }
    }, [address, activeChain]);

    // Show right axis (earnings) if user has profit or demo mode is on
    const shouldShowRightAxis = isDemoMode || userProfit > 0;

    if (media) {
      return (
        <Flex w="100%" minH="319px">
          {loading ? (
            <Skeleton height="319px" width="100%" />
          ) : (
            <PerformanceChart
              activeType={pathName}
              chartData={chartData}
              showRightAxis={shouldShowRightAxis}
            />
          )}
        </Flex>
      );
    }

    return (
      <Flex w="100%" minH="400px">
        {loading ? (
          <Skeleton height="400px" width="100%" />
        ) : (
          <PerformanceChart
            activeType={pathName}
            chartData={chartData}
            showRightAxis={shouldShowRightAxis}
          />
        )}
      </Flex>
    );
  }
);
