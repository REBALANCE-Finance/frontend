'use client';

import { Box, Flex, Skeleton, StackDivider, useMediaQuery, VStack } from "@chakra-ui/react";
import { IAreaChartData, IPoolData } from "@/api/pools/types";
import { MEDIA_QUERY_MAX } from "../../consts";
import { RebalancePerformanceCard } from "./RebalancePerformanceCard";
import { PerformanceChart } from "./RebalancePerformanceCharts";
import { getCurrentPath, performanceInfo } from "./utils";
import { usePathname } from "next/navigation";

export const RebalancePerformance = ({ pools, chartData, loading } : {
  pools: IPoolData[],
  chartData: IAreaChartData,
  loading: boolean
}) => {
  const location = usePathname();
  const pathName = getCurrentPath(location || '');
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  const info = {
    lending: [
      { label: "Total value locked", value: pools[0]?.funds.toFixed(2) },
      { label: "Total earned", value: pools[0]?.earned.toFixed(2) }
    ],
    borrowing: [
      { label: "Total borrowed", value: "-" },
      { label: "Total money saved", value: "-" }
    ]
  };

  if (media) {
    return (
      <Flex w="100%" minH="319px">
        {loading ? (
          <Skeleton height="319px" width="100%" />
        ) : (
          <PerformanceChart activeType={pathName} chartData={chartData}/>
        )}
      </Flex>
    );
  }

  return (
    <Flex gap="24px">
      <Flex direction="column" gap="12px">
        {performanceInfo?.map(elem => (
          <Flex
            key={elem.title}
            textAlign="center"
            borderRadius="3px"
            p="8px 12px"
            w="100%"
            color={elem.type === pathName ? "" : "black.0"}
            borderColor={elem.type === pathName ? "greenAlpha.100" : "#1F1F1F"}
          >
            {loading ? (
              <Skeleton height="100px" width="100%" />
            ) : (
              <RebalancePerformanceCard
                key={elem.title}
                title={elem.title}
                subtitle={elem.subtitle}
                image={elem.image}
                info={info[elem.type]}
                isActive={elem.type === pathName}
              />
            )}
          </Flex>
        ))}
      </Flex>

      <Flex w="100%">
        {loading ? (
          <Skeleton height="319px" width="100%" />
        ) : (
          <PerformanceChart activeType={pathName} chartData={chartData}/>
        )}
      </Flex>
    </Flex>
  );
};

export const RebalancePerformanceMob = ({ loading } : { loading: boolean }) => {
  const location = usePathname();
  const pathName = getCurrentPath(location || '');

  return (
    <VStack
      direction="column"
      divider={<StackDivider borderColor="#1F1F1F" />}
      mb="22px"
      w="100%"
      order={{ base: 0, md: 1 }}
    >
      <Flex w="100%" px="16px" gap="8px">
        {performanceInfo.map(elem => (
          <Flex
            key={elem.title}
            textAlign="center"
            borderRadius="3px"
            p="8px 12px"
            w="100%"
            color={elem.type !== pathName ? "" : "black"}
            justifyContent="center"
            alignItems="center"
            bg={elem.type === pathName ? "greenAlpha.100" : "#282a31"}
          >
            {loading ? <Skeleton height="20px" width="100%" /> : elem.title}
          </Flex>
        ))}
      </Flex>
    </VStack>
  );
};