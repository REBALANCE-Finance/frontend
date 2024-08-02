"use client";

import { Flex, useMediaQuery, Text, Skeleton } from "@chakra-ui/react";
import { MEDIA_QUERY_MAX } from "../consts";
import { RebalancePerformance } from "../features/RebalancePerformance";
import { PoolsHeader } from "../pagesComponents/Pools/PoolsHeader";
import { IAreaChartData, IPoolData } from "@/api/pools/types";
import { useAccount } from "wagmi";

export const PoolLayout = ({
  children,
  pools,
  chartData,
  loading,
  error,
  isTable,
  onChangeView,
  earnedPoints,
  isLoadingPoints
}: {
  children: React.ReactNode;
  pools: IPoolData[];
  chartData: IAreaChartData;
  loading: boolean;
  error: string | null;
  isTable: boolean;
  onChangeView: VoidFunction;
  earnedPoints: number;
  isLoadingPoints: boolean;
}) => {
  const { address } = useAccount();
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  const [isDesktop] = useMediaQuery("(min-width: 1130px)");
  if (media === undefined) return null;
  return (
    <Flex direction="column" w="100%" align="center">
      {!isDesktop && isLoadingPoints && address && <Skeleton height="16px" width="60px" />}
      {!isDesktop && !isLoadingPoints && address && (
        <Flex alignItems="center" gap={3} py={3} px={4} mb={address ? 0 : 6}>
          <Text textStyle="text12" color="black.5" borderBottom="1px dashed" borderColor="black.5">
            ✨ Earned points:
          </Text>
          <Text textStyle="text12" color="black.5">
            {earnedPoints}
          </Text>
        </Flex>
      )}
      <Flex
        direction="column"
        justify="center"
        gap="44px"
        maxW="1300px"
        w="100%"
        p={{ base: "0 16px 16px", xl: 0 }}
        order={{ base: 3 }}
        mt={isLoadingPoints ? 4 : 0}
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
