import {
  areaLines,
  connectedAreaLines
} from "@/features/RebalancePerformance/RebalancePerformanceCharts/utils";
import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { formatNumber } from "@/utils/formatNumber";

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  name?: boolean | undefined;
  isLending?: boolean;
}

export const CustomTooltip = ({ active, payload, name, isLending }: CustomTooltipProps) => {
  const _payload = payload?.slice()?.reverse();

  const getTooltipName = (item: any) => {
    if (item?.name === areaLines[0].name || item?.name === connectedAreaLines[0].name) {
      return "APY";
    }
    if (item?.name === connectedAreaLines[1].name) {
      return "Earned";
    }
  };

  const getNameColor = (item: any) => {
    if (item?.name === areaLines[0].name || item?.name === connectedAreaLines[0].name) {
      return "greenAlpha.60";
    }
    if (item?.name === connectedAreaLines[1].name) {
      return "violetAlpha.60";
    }
  };

  const getValue = (item: any) => {
    if (item?.name === areaLines[0].name || item?.name === connectedAreaLines[0].name) {
      return `${Number(item?.value)?.toFixed(2)}%`;
    }
    if (item?.name === connectedAreaLines[1].name) {
      const value = Number(item?.value);
      if (value === 0) return "$0";
      if (value < 0.0001) return "< $0.0001";
      if (value < 10) return `$${value.toFixed(4)}`;
      return `$${formatNumber(value.toFixed(2))}`;
    }
  };

  if (active && isLending) {
    return (
      <Flex
        w="max-content"
        p="10px"
        gap="4px"
        flexDirection="column"
        bg="black.60"
        borderRadius="4px"
      >
        {_payload?.map((e, i) => (
          <Flex flexDirection="column" key={i}>
            {i === 0 && (
              <Text variant="regular14" color="darkgray">
                {/* @ts-ignore */}
                {dayjs(e?.payload?.date).format("MMM DD, YYYY")}
              </Text>
            )}
            <Flex alignItems="center" justifyContent="space-between" gap={10}>
              <Text variant="regular14" color={getNameColor(e)}>
                {getTooltipName(e)}
              </Text>
              <Text variant="regular14">{getValue(e)}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  }

  if (active && !isLending) {
    return (
      <Flex
        w="max-content"
        p="10px"
        gap="10px"
        flexDirection="column"
        bg="black.60"
        borderRadius="4px"
      >
        {payload?.map((e, i) => (
          <Flex flexDirection="column" key={i}>
            <Flex alignItems="flex-start" justifyContent="space-between" flexDirection={"column"}>
              <Text variant="regular14">
                {!!name ? e.name : null} {Number(e?.value)?.toFixed(2)} %
              </Text>
              <Text variant="regular14">{dayjs(e?.payload?.date).format("MMM DD, YYYY")}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  }

  return null;
};
