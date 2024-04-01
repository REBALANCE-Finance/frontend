'use client'

import { Flex, useMediaQuery } from "@chakra-ui/react";
import React from "react";

import { MEDIA_QUERY_MAX } from "../consts";
import { RebalancePerformance, RebalancePerformanceMob } from "../features/RebalancePerformance";
import { PoolsHeader } from "../pagesComponents/Pools/PoolsHeader";
import { IAreaChartData, IPoolData } from "@/api/pools/types";

export const PoolLayout = ({ children, pools, chartData } : {
  children: React.ReactNode,
  pools: IPoolData[],
  chartData: IAreaChartData
}) => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);

  if (media) {
    return (
      <Flex direction="column" w="100%" align="center">
        {/* <AppBanner /> */}
        <RebalancePerformanceMob />
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
          {pools ? <RebalancePerformance pools={pools} chartData={chartData}/> : null}
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex direction="column" w="100%" gap="44px" align="center">
      {/* <AppBanner /> */}
      {media ? <RebalancePerformanceMob /> : null}

      <Flex
        direction="column"
        justify="center"
        gap="44px"
        maxW="1300px"
        w="100%"
        p={{ base: "16px", xl: 0 }}
        order={{ base: 3 }}
      >
        {pools ? <RebalancePerformance pools={pools} chartData={chartData}/> : null}
        <Flex direction="column" gap="24px">
          <PoolsHeader />
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
