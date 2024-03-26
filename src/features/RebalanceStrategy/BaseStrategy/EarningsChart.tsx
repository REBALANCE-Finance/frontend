import { Divider, Flex, Text } from "@chakra-ui/react";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { DateSwitcher } from "../../../components/data-switcher";
import { useDateSwitcher } from "../../../components/data-switcher/hooks";
import { DATES } from "../../../components/data-switcher/utils";
import { useEffect, useState } from "react";
import { getPersonalEarnings } from "@/api/pools/queries";
import { formatNumber } from "@/utils/formatNumber";
import { CustomTooltipBarChart } from "./components/CustomToolTipBarChart";

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

interface IBarChartData {
  name: Date | string,
  uv: number
}

const EarningsChart = ({ address, token } : {
  address: `0x${string}` | undefined,
  token: string
}) => {
  const { selectedDate, setSelectDate } = useDateSwitcher(DATES[0]);
  const [userEarningsData, setUserEarningsData] = useState<IBarChartData[] | undefined>(undefined);
  const [avgApr, setAvgApr] = useState<number>(0);
  const [error, setError] = useState(false);
  console.log(userEarningsData);
  

  useEffect(() => {
    if (address) {
      setError(false)
      getPersonalEarnings(selectedDate.interval, selectedDate.intervals, '0x5B7Ca66e1e94Fb1800F750022Ae0c705Bf1A4AD4', token)
        .then(data => {
          setUserEarningsData(data.userEarned);
          setAvgApr(data.avgAPR);
        })
        .catch((e) => {
          setError(true);
        })
    }
  }, [address, selectedDate])

  const userTotalEarning = userEarningsData?.reduce((acc, el) => (acc + el.uv), 0) || 0;

  return (
    <>
      {!error ? (
        <Flex flexDirection="column" width="100%">
          <Flex mt="48px" mb="12px" justifyContent="space-between" alignItems="center">
            <Text fontSize="lg">My earnings</Text>
            <DateSwitcher date={DATES} selectDate={setSelectDate} selectedDate={selectedDate} />
          </Flex>
          <Flex w="100%" bg="#17191C" borderRadius="8px" minH="319px" padding="24px">
            <Flex flexDirection="column" width="25%" justifyContent="center">
              <Flex flexDirection="column">
                <Text color="#B4B4B4">Earned</Text>
                <Text textStyle="textMono16">{`${userTotalEarning.toFixed(2)} $`}</Text>
              </Flex>
              <Divider mt="22px" mb="22px" borderColor="#0F1113" height="2px" width="82px" />
              <Flex flexDirection="column">
                <Text color="#B4B4B4">APR</Text>
                <Text textStyle="textMono16">{`${avgApr.toFixed(2)} %`}</Text>
              </Flex>
            </Flex>
            <ResponsiveContainer width="90%" height="100%">
              {address ? (
                <BarChart width={150} height={10} data={userEarningsData}>
                  <Bar barSize={6} dataKey="uv" fill="#4CFF94" minPointSize={5} >
                    {
                      userEarningsData?.map((entry, index) => {
                        const color = entry.uv > 0 ? "#4CFF94" : '#1A3C28';
                        return <Cell fill={color} />;
                      })
                    }
                  </Bar>
                  <Tooltip cursor={{ opacity: 0.1, strokeWidth: 1 }} content={<CustomTooltipBarChart />} />
                </BarChart>
              ) : (
                <BarChart width={150} height={10} data={data}>
                  <Bar barSize={6} dataKey="uv" fill="#4CFF94">
                  </Bar>
                  <Tooltip cursor={{ opacity: 0.1, strokeWidth: 1 }} content={<CustomTooltipBarChart />} />
                </BarChart>
              )}
            </ResponsiveContainer>
          </Flex>
        </Flex>
      ) : (
        <Flex flexDirection="column" width="100%">
          <Flex mt="48px" mb="12px" justifyContent="space-between" alignItems="center">
            <Text fontSize="lg">My earnings</Text>
            <DateSwitcher date={DATES} selectDate={setSelectDate} selectedDate={selectedDate} />
          </Flex>
          <Flex align={'center'} justify={'center'} width="100%" mt="48px">
            <Text color="white">Error on loading data. Please try again later</Text>
          </Flex>
        </Flex>
      )}
    
    </>
  );
};
export default EarningsChart;
