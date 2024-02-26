import { Flex, Switch, Text } from "@chakra-ui/react";
import React from "react";

import { BarChart } from "../../../components/common/charts/BarChart";
import { bar, barGradient } from "../../../components/common/charts/utils";
import { DateSwitcher } from "../../../components/data-switcher";
import { useDateSwitcher } from "../../../components/data-switcher/hooks";
import { DATES } from "../../../components/data-switcher/utils";
import { themes } from "../../../themes";
import { tickFormatter } from "./utils";

const colors = {
  borrowingFee: {
    top: "#EC5A65",
    bottom: "#E63946"
  },
  healthFactor: themes.colors.greenAlpha["80"]
};

const dataBarReverse = [
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
    <Flex direction={{ base: "column", md: "row" }} w="100%" gap={{ base: "24px" }}>
      <Flex direction="column" w="100%" h={{ base: "317px", md: "auto" }}>
        <Flex alignItems={{ base: "center" }} justifyContent={{ base: "space-between" }} mb="10px">
          <Text color="lightGray">Borrowing fees</Text>
          <DateSwitcher date={DATES} selectDate={setSelectDate} selectedDate={selectedDate} />
        </Flex>
        <BarChart
          data={dataBarReverse}
          bar={barGradient({ data: dataBarReverse, color: colors.borrowingFee })}
          reversed
          tickFormatter={tickFormatter}
        />
      </Flex>

      <Flex w="100%" direction="column" h={{ base: "317px", md: "auto" }}>
        <Flex alignItems={{ base: "center" }} justifyContent={{ base: "space-between" }} mb="10px">
          <Text color="lightGray">Health Factor</Text>
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

        <BarChart data={dataBar} bar={bar({ data: dataBar, color: colors.healthFactor })} hideX />

        <Flex alignItems={{ base: "center" }} justifyContent={{ base: "space-between" }} mt="10px">
          <Text color="lightGray">Extra-Collateral</Text>
          <Switch />
        </Flex>
      </Flex>
    </Flex>
  );
};
