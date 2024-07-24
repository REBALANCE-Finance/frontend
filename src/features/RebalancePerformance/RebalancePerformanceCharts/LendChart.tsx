"use client";
import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { Area } from "recharts";

import { AreaChart } from "../../../components/charts/AreaChart";
import { DateSwitcher } from "../../../components/data-switcher";
import { useDateSwitcher } from "../../../components/data-switcher/hooks";
import { DATES } from "../../../components/data-switcher/utils";
import { MEDIA_QUERY_MAX } from "../../../consts";
import { LegendAreaChart } from "./components/LegendAreaChart";
import { areaLines, colorsArea, tickFormatter } from "./utils";
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
    {/* <linearGradient id="color-borrowing" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={colorsArea.borrowing} stopOpacity={0.8} />
      <stop offset="95%" stopColor={colorsArea.borrowing} stopOpacity={0} />
    </linearGradient> */}
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

  // TODO: bring back this when api will be ready
  // if (areas.length !== 1) {
  //   arr.push(
  //     <Area
  //       key="hardcodedLine"
  //       name={areaLines[1].name}
  //       type="linear"
  //       dataKey="hardcodedLine"
  //       stroke="#8884d8"
  //       fillOpacity={1}
  //       fill={`url(#color-${ROUTES_TYPE.borrowing})`}
  //     />
  //   );
  // }

  // return [...arr, areaGradient];
  return arr;
};

export const LendChart = ({ chartData }: { chartData: IAreaChartData }) => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  const { selectedDate, setSelectDate } = useDateSwitcher(DATES[0]);
  const { address, isConnected } = useAccount();

  const _areaLines = useMemo(() => {
    if (isConnected) {
      return areaLines;
    }
    return [areaLines[0]];
  }, [isConnected]);

  const getLines = () => {
    // TODO: bring back when api will be ready
    // if (isConnected) {
    //   return areaLines;
    // }
    return [areaLines[0]];
  };

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
        lines={getAreaLines(getLines())}
        gradient={areaGradient}
        tickFormatter={tickFormatter}
        isLending
        isConnected={isConnected}
      />

      {media && (
        <Flex alignItems="center" gap="12px">
          {areaLines.map(elem => (
            <LegendAreaChart key={elem.type} text={elem.name} color={colorsArea[elem.type]} />
          ))}
        </Flex>
      )}
    </Flex>
  );
};
