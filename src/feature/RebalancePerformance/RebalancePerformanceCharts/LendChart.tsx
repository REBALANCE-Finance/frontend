import { Flex, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { Area } from "recharts";

import { AreaChart } from "../../../components/common/charts/AreaChart";
import { DateSwitcher } from "../../../components/data-switcher";
import { useDateSwitcher } from "../../../components/data-switcher/hooks";
import { DATES } from "../../../components/data-switcher/utils";
import { MEDIA_QUERY_MAX } from "../../../consts";
import { LegendAreaChart } from "./components/LegendAreaChart";
import { IAreaLineProps } from "./types";
import { areaLines, colorsArea, tickFormatter } from "./utils";

const areaGradient = (
  <defs>
    <linearGradient id="color-lending" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={colorsArea.lending} stopOpacity={0.8} />
      <stop offset="95%" stopColor={colorsArea.lending} stopOpacity={0} />
    </linearGradient>
    <linearGradient id="color-borrowing" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={colorsArea.borrowing} stopOpacity={0.8} />
      <stop offset="95%" stopColor={colorsArea.borrowing} stopOpacity={0} />
    </linearGradient>
  </defs>
);

const getAreaLines = (areas: IAreaLineProps[]) => {
  const arr = areas.map((area, i) => (
    <Area
      key={i}
      name={area.name}
      type="monotone"
      dataKey={area.type}
      stroke={colorsArea.borrowing}
      activeDot={{ r: 3, stroke: colorsArea.borrowing }}
      fill={`url(#color-${area.type})`}
    />
  ));

  return [...arr, areaGradient];
};

const data = [
  {
    date: "12.01.2024",
    lending: 4000,
    borrowing: 2400
  },
  {
    date: "12.02.2024",
    lending: 3000,
    borrowing: 1398
  },
  {
    date: "12.05.2024",
    lending: 2000,
    borrowing: 9800
  },
  {
    date: "12.08.2024",
    lending: 2780,
    borrowing: 3908
  },
  {
    date: "12.09.2024",
    lending: 1890,
    borrowing: 4800
  },
  {
    date: "12.10.2024",
    lending: 2390,
    borrowing: 3800
  },
  {
    date: "12.11.2024",
    lending: 3490,
    borrowing: 4300
  }
];

export const LendChart = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  const { selectedDate, setSelectDate } = useDateSwitcher(DATES[0]);
  return (
    <Flex w="100%" direction="column" position="relative">
      <Flex w="100%" alignItems="center" justify="space-between" mb={{ base: "0", md: "10px" }}>
        {!media && (
          <Flex alignItems="center" gap="12px">
            {areaLines.map(elem => (
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
        data={data}
        lines={getAreaLines(areaLines)}
        gradient={areaGradient}
        tickFormatter={tickFormatter}
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
