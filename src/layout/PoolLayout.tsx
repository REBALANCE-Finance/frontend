"use client";

import { Flex, useMediaQuery, Skeleton, useOutsideClick, Box } from "@chakra-ui/react";
import { MEDIA_QUERY_MAX, MOCKED_ADDRESS } from "../consts";
import { RebalancePerformance } from "../features/RebalancePerformance";
import { PoolsHeader } from "../pagesComponents/Pools/PoolsHeader";
import { IAreaChartData, IPoolData } from "@/api/pools/types";
import { useAccount } from "wagmi";
import { useRef, useState } from "react";
import UserTasksPopover from "@/components/popover/UserTasksPopover";
import RewardsButton from "@/components/button/RewardsButton";
import MobileTasksPopover from "@/components/popover/Mobile";
import { isMobile, isTablet } from "react-device-detect";

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
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const tooltipRef = useRef();

  useOutsideClick({
    // @ts-ignore
    ref: tooltipRef,
    handler: () => setIsOpenTooltip(false)
  });

  if (media === undefined) return null;
  return (
    <Flex direction="column" w="100%" align="center">
      {!isDesktop && isLoadingPoints && address && <Skeleton height="16px" width="60px" />}
      {!isDesktop && (
        <Flex gap={6} mt={4} mb={8} alignSelf="center">
          {!isMobile && <UserTasksPopover address={address || MOCKED_ADDRESS} />}
          {isMobile && <MobileTasksPopover />}
          <RewardsButton />
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
