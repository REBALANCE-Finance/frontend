import { Flex } from "@chakra-ui/react";
import React from "react";
import { Area } from "recharts";

import { AreaChart } from "../../../components/common/charts/AreaChart";
import { DateSwitcher } from "../../../components/data-switcher";
import { useDateSwitcher } from "../../../components/data-switcher/hooks";
import { DATES } from "../../../components/data-switcher/utils";
import { themes } from "../../../themes";
import { LegendAreaChart } from "./components/LegendAreaChart";
import { tickFormatter } from "./utils";

const colorsArea = {
  lending: themes.colors.greenAlpha["100"],
  borrowing: themes.colors.violetAlpha["100"]
};

const areaLines = [
  <Area
    key={1}
    name="Earned from lending"
    type="monotone"
    dataKey="lending"
    stroke={colorsArea.lending}
    fill="url(#colorlending)"
  />,
  <Area
    key={2}
    name="Spent on borrowing"
    type="monotone"
    dataKey="borrowing"
    stroke={colorsArea.borrowing}
    fill="url(#colorBorrowing)"
  />
];

const areaGradient = (
  <defs>
    <linearGradient id="colorlending" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={colorsArea.lending} stopOpacity={0.8} />
      <stop offset="95%" stopColor={colorsArea.lending} stopOpacity={0} />
    </linearGradient>
    <linearGradient id="colorBorrowing" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor={colorsArea.borrowing} stopOpacity={0.8} />
      <stop offset="95%" stopColor={colorsArea.borrowing} stopOpacity={0} />
    </linearGradient>
  </defs>
);

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
  const { selectedDate, setSelectDate } = useDateSwitcher(DATES[0]);
  return (
    <Flex w="100%" direction="column">
      <Flex w="100%" alignItems="center" justify="space-between" mb="10px">
        <Flex alignItems="center" gap="12px">
          <LegendAreaChart text="Earned from lending" color={colorsArea.lending} />
          <LegendAreaChart text="Spent on borrowing" color={colorsArea.borrowing} />
        </Flex>

        <DateSwitcher date={DATES} selectDate={setSelectDate} selectedDate={selectedDate} />
      </Flex>

      <AreaChart
        data={data}
        lines={areaLines}
        gradient={areaGradient}
        tickFormatter={tickFormatter}
      />
    </Flex>
  );
};
