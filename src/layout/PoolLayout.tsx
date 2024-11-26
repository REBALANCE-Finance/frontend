"use client";

import { Flex, useMediaQuery } from "@chakra-ui/react";
import { MEDIA_QUERY_MAX, MOCKED_ADDRESS } from "../consts";
import { RebalancePerformance } from "../features/RebalancePerformance";
import { PoolsHeader } from "../pagesComponents/Pools/PoolsHeader";
import { IAreaChartData, IPoolData } from "@/api/pools/types";

export const PoolLayout = ({
  children,
  pools,
  chartData,
  loading,
  error,
  isTable,
  onChangeView
}: {
  children: React.ReactNode;
  pools: IPoolData[];
  chartData: IAreaChartData;
  loading: boolean;
  error: string | null;
  isTable: boolean;
  onChangeView: VoidFunction;
}) => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);

  if (media === undefined) return null;
  return (
    <Flex direction="column" w="100%" align="center">
      <Flex
        direction="column"
        justify="center"
        gap="44px"
        maxW="1300px"
        w="100%"
        p={{ base: "0 16px 16px", xl: 0 }}
        order={{ base: 3 }}
      >
        <RebalancePerformance pools={pools} chartData={chartData} loading={loading} />
        <Flex direction="column" gap="24px">
          <PoolsHeader isTable={isTable} onChangeView={onChangeView} />
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};
