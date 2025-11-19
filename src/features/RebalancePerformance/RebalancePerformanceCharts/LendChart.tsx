"use client";
import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Area, Bar } from "recharts";

import { AreaChart } from "../../../components/charts/AreaChart";
import { DateSwitcher } from "../../../components/data-switcher";
import { useDateSwitcher } from "../../../components/data-switcher/hooks";
import { DATES } from "../../../components/data-switcher/utils";
import { MEDIA_QUERY_MAX } from "../../../consts";
import { LegendAreaChart } from "./components/LegendAreaChart";
import { areaLines, colorsArea, connectedAreaLines, tickFormatter } from "./utils";
import { IAreaChartData } from "@/api/pools/types";
import UserProfit from "@/pagesComponents/Pools/PoolsLending/components/UserProfit";
import { useAccount } from "wagmi";
import { IAreaLineProps } from "./types";
import { ROUTES_TYPE } from "@/consts/routes-type";

const areaGradient = (
  <defs>
    <linearGradient id="color-lending" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={colorsArea.lending} stopOpacity={0.8} />
      <stop offset="95%" stopColor={colorsArea.lending} stopOpacity={0} />
    </linearGradient>
    {/* Gradient for bar columns: 75% opacity at bottom to 25% at top */}
    <linearGradient id="bar-gradient" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0%" stopColor={colorsArea.borrowing} stopOpacity={0.75} />
      <stop offset="100%" stopColor={colorsArea.borrowing} stopOpacity={0.25} />
    </linearGradient>
  </defs>
);

const getAreaLines = (areas: IAreaLineProps[]) => {
  const arr = areas.map((area, i) => (
    <Area
      key={i}
      name={area.name}
      type="linear"
      dataKey={area.type}
      stroke={colorsArea[area.type]}
      activeDot={{ r: 3, stroke: colorsArea[area.type] }}
      fill={`url(#color-${area.type})`}
    />
  ));

  if (areas.length !== 1) {
    arr.push(
      <Bar
        key="userEarning"
        name={connectedAreaLines[1].name}
        dataKey="userEarning"
        fill="url(#bar-gradient)"
        yAxisId={1}
        barSize={12}
        radius={[4, 4, 0, 0]}
      />
    );
  }

  return [...arr, areaGradient];
};

export const LendChart = ({
  chartData,
  showRightAxis
}: {
  chartData: IAreaChartData;
  showRightAxis?: boolean;
}) => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  const { selectedDate, setSelectDate } = useDateSwitcher(DATES[0]);
  const { address, isConnected } = useAccount();

  const _areaLines = useMemo(() => {
    if (showRightAxis) {
      return connectedAreaLines;
    }
    return areaLines;
  }, [showRightAxis]);

  return (
    <Flex w="100%" direction="column" position="relative">
      {address && (
        <Text
          textStyle="h2"
          color="white"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={media ? "24px" : "14px"}
        >
          <span>My Total Profit</span>
          <UserProfit address={address} />
        </Text>
      )}
      <Flex w="100%" alignItems="center" justify="space-between" mb={{ base: "0", md: "10px" }}>
        {!media && (
          <Flex alignItems="center" gap="12px">
            {_areaLines.map(elem => (
              <LegendAreaChart key={elem.type} text={elem.name} color={colorsArea[elem.type]} />
            ))}
          </Flex>
        )}

        <Flex
          zIndex={{ base: 1, md: 0 }}
          position={{ base: "absolute", md: "relative" }}
          right={{ base: "0" }}
        >
          <DateSwitcher date={DATES} selectDate={setSelectDate} selectedDate={selectedDate} />
        </Flex>
      </Flex>

      <AreaChart
        data={chartData?.chartData[selectedDate.name]}
        lines={getAreaLines(_areaLines)}
        gradient={areaGradient}
        tickFormatter={tickFormatter}
        isLending
        isConnected={!!address || showRightAxis}
        showRightAxis={showRightAxis}
      />

      {media && (
        <Flex alignItems="center" gap="12px">
          {_areaLines.map(elem => (
            <LegendAreaChart key={elem.type} text={elem.name} color={colorsArea[elem.type]} />
          ))}
        </Flex>
      )}
    </Flex>
  );
};
