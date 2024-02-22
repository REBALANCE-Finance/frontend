import { Flex, Switch, Text } from "@chakra-ui/react";
import React from "react";
import { Area } from "recharts";

import { AreaChart } from "../../../components/common/charts/AreaChart";
import { BarChart } from "../../../components/common/charts/BarChart";
import { DateSwitcher } from "../../../components/data-switcher";
import { useDateSwitcher } from "../../../components/data-switcher/hooks";
import { DATES } from "../../../components/data-switcher/utils";
import { themes } from "../../../themes";
import { tickFormatter } from "./utils";

const colors = {
  area: themes.colors.greenAlpha["100"]
};

const dataArea = [
  {
    date: "12.01.2024",
    lending: 4000
  },
  {
    date: "12.02.2024",
    lending: 3000
  },
  {
    date: "12.05.2024",
    lending: 2000
  },
  {
    date: "12.08.2024",
    lending: 2780
  },
  {
    date: "12.09.2024",
    lending: 1890
  },
  {
    date: "12.10.2024",
    lending: 2390
  },
  {
    date: "12.11.2024",
    lending: 3490
  }
];

const dataBar = [
  {
    date: "12.01.2024",
    lending: 4000
  },
  {
    date: "12.02.2024",
    lending: 3000
  },
  {
    date: "12.05.2024",
    lending: 2000
  },
  {
    date: "12.08.2024",
    lending: 2780
  },
  {
    date: "12.09.2024",
    lending: 1890
  },
  {
    date: "12.10.2024",
    lending: 2390
  },
  {
    date: "12.11.2024",
    lending: 3490
  },
  {
    date: "12.12.2024",
    lending: 400
  },
  {
    date: "12.13.2024",
    lending: 300
  },
  {
    date: "12.14.2024",
    lending: 200
  },
  {
    date: "12.15.2024",
    lending: 278
  },
  {
    date: "12.16.2024",
    lending: 5000
  },
  {
    date: "12.17.2024",
    lending: 239
  },
  {
    date: "12.18.2024",
    lending: 3490
  }
];

export const BorrowChart = () => {
  const { selectedDate, setSelectDate } = useDateSwitcher(DATES[0]);

  return (
    <Flex w="100%" gap={{ base: "24px" }}>
      <Flex direction="column" w="100%">
        <Flex alignItems={{ base: "center" }} justifyContent={{ base: "space-between" }} mb="10px">
          <Text color="gray">My borrow positions</Text>
          <DateSwitcher date={DATES} selectDate={setSelectDate} selectedDate={selectedDate} />
        </Flex>
        <AreaChart
          data={dataArea}
          lines={[
            <Area
              key={1}
              type="monotone"
              dataKey="lending"
              stroke={colors.area}
              fill="url(#colorLending)"
            />
          ]}
          gradient={
            <linearGradient id="colorLending" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.area} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors.area} stopOpacity={0} />
            </linearGradient>
          }
          tickFormatter={tickFormatter}
        />
      </Flex>

      <Flex w="100%" direction="column">
        <Flex alignItems={{ base: "center" }} justifyContent={{ base: "space-between" }} mb="10px">
          <Text color="gray">My borrow positions</Text>
          <Flex
            alignItems="center"
            justifyContent="center"
            borderRadius="4px"
            p="4px 6px 4px 6px"
            bg="orangeAlpha.10"
            fontSize="lg"
            color="orangeAlpha.100"
          >
            82%
          </Flex>
        </Flex>

        <BarChart data={dataBar} />

        <Flex alignItems={{ base: "center" }} justifyContent={{ base: "space-between" }} mt="10px">
          <Text color="gray">Extra-Collateral</Text>
          <Switch />
        </Flex>
      </Flex>
    </Flex>
  );
};
