import { Divider, Flex, Text } from "@chakra-ui/react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { DateSwitcher } from "../../../components/data-switcher";
import { useDateSwitcher } from "../../../components/data-switcher/hooks";
import { DATES } from "../../../components/data-switcher/utils";

const data = [
  {
    name: "Page 1",
    uv: 1000
  },
  {
    name: "Page 2",
    uv: 2000
  },
  {
    name: "Page 3",
    uv: 2000
  },
  {
    name: "Page 4",
    uv: 1780
  },
  {
    name: "Page 5",
    uv: 1890
  },
  {
    name: "Page 6",
    uv: 1390
  },
  {
    name: "Page 7",
    uv: 1490
  },
  {
    name: "Page 8",
    uv: 1200
  },
  {
    name: "Page 9",
    uv: 1130
  },
  {
    name: "Page 10",
    uv: 1200
  },
  {
    name: "Page 11",
    uv: 1780
  },
  {
    name: "Page 12",
    uv: 1890
  },
  {
    name: "Page 14",
    uv: 1390
  },
  {
    name: "Page 15",
    uv: 390
  },
  {
    name: "Page 16",
    uv: 2000
  },
  {
    name: "Page 17",
    uv: 2000
  },
  {
    name: "Page 18",
    uv: 1200
  },
  {
    name: "Page 19",
    uv: 1780
  },
  {
    name: "Page 20",
    uv: 1790
  },
  {
    name: "Page 21",
    uv: 1790
  },
  {
    name: "Page 22",
    uv: 2490
  },
  {
    name: "Page 23",
    uv: 2000
  },
  {
    name: "Page 24",
    uv: 2000
  },
  {
    name: "Page 25",
    uv: 1000
  },
  {
    name: "Page 26",
    uv: 1780
  },
  {
    name: "Page 27",
    uv: 890
  },
  {
    name: "Page 28",
    uv: 1270
  },
  {
    name: "Page 29",
    uv: 1490
  }
];

const EarningsChart = () => {
  const { selectedDate, setSelectDate } = useDateSwitcher(DATES[0]);
  return (
    <Flex flexDirection="column" width="100%">
      <Flex mt="48px" mb="12px" justifyContent="space-between" alignItems="center">
        <Text fontSize="lg">My earnings</Text>
        <DateSwitcher date={DATES} selectDate={setSelectDate} selectedDate={selectedDate} />
      </Flex>
      <Flex w="100%" bg="#17191C" borderRadius="8px" minH="319px" padding="24px">
        <Flex flexDirection="column" width="25%" justifyContent="center">
          <Flex flexDirection="column">
            <Text color="#B4B4B4">Earned</Text>
            <Text textStyle="textMono16">1,450 $</Text>
          </Flex>
          <Divider mt="22px" mb="22px" borderColor="#0F1113" height="2px" width="82px" />
          <Flex flexDirection="column">
            <Text color="#B4B4B4">APR</Text>
            <Text textStyle="textMono16">10.2 %</Text>
          </Flex>
        </Flex>
        <ResponsiveContainer width="90%" height="100%">
          <BarChart width={150} height={10} data={data}>
            <Bar barSize={6} dataKey="uv" fill="#4CFF94" />
          </BarChart>
        </ResponsiveContainer>
      </Flex>
    </Flex>
  );
};
export default EarningsChart;
