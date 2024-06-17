'use client';

import { Flex, useMediaQuery } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { MEDIA_QUERY_MAX } from "../consts";
import { RebalancePerformance, RebalancePerformanceMob } from "../features/RebalancePerformance";
import { PoolsHeader } from "../pagesComponents/Pools/PoolsHeader";
import { IAreaChartData, IPoolData } from "@/api/pools/types";

export const PoolLayout = ({ children, pools, chartData, loading, error } : {
  children: React.ReactNode,
  pools: IPoolData[],
  chartData: IAreaChartData,
  loading: boolean,
  error: string | null
}) => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);

  if (media === undefined) return null;
  if (media) {
    return (
      <Flex direction="column" w="100%" align="center">
        <RebalancePerformanceMob loading={loading} />
        <Flex direction="column" gap="24px" p={{ base: "16px", xl: 0 }} w="100%">
          <PoolsHeader />
          {children}
        </Flex>
        <Flex
          direction="column"
          justify="center"
          gap="44px"
          maxW="1300px"
          w="100%"
          p={{ base: "16px", xl: 0 }}
          order={{ base: 3 }}
        >
          <RebalancePerformance pools={pools} chartData={chartData} loading={loading} />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex direction="column" w="100%" gap="44px" align="center">
      {media ? <RebalancePerformanceMob loading={loading} /> : null}

      <Flex
        direction="column"
        justify="center"
        gap="44px"
        maxW="1300px"
        w="100%"
        p={{ base: "16px", xl: 0 }}
        order={{ base: 3 }}
      >
        <RebalancePerformance pools={pools} chartData={chartData} loading={loading} />
        <Flex direction="column" gap="24px">
          <PoolsHeader />
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
