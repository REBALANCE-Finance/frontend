import { Flex, StackDivider, useMediaQuery, VStack } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { IPoolData } from "@/api/pools/types";

import { MEDIA_QUERY_MAX } from "../../consts";
// import { ROUTES_TYPE } from "../../consts/routes-type";
import { RebalancePerformanceCard } from "./RebalancePerformanceCard";
import { PerformanceChart } from "./RebalancePerformanceCharts";
import { getCurrentPath, performanceInfo } from "./utils";
import { usePathname } from "next/navigation";

export const RebalancePerformance = ({ pools }: { pools: IPoolData[] }) => {
  const location = usePathname();
  const pathName = getCurrentPath(location || '');
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  const infoMock = {
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
        <PerformanceChart activeType={pathName} />
      </Flex>
    );
  }

  return (
    <Flex gap="24px">
      <Flex direction="column" gap="12px">
        {performanceInfo.map(elem => (
          <Flex
            // as={NavLink}
            // to={`/${elem.type}`}
            key={elem.title}
            textAlign="center"
            borderRadius="3px"
            p="8px 12px"
            w="100%"
            color={elem.type === pathName ? "" : "black.0"}
            borderColor={elem.type === pathName ? "greenAlpha.100" : "#1F1F1F"}
          >
            <RebalancePerformanceCard
              key={elem.title}
              title={elem.title}
              subtitle={elem.subtitle}
              image={elem.image}
              info={infoMock[elem.type]}
              isActive={elem.type === pathName}
            />
          </Flex>
        ))}
      </Flex>

      <Flex w="100%">
        <PerformanceChart activeType={pathName} />
      </Flex>
    </Flex>
  );
};

export const RebalancePerformanceMob = () => {
  const location = useLocation();
  const pathName = getCurrentPath(location.pathname);
  // const infoMock = {
  //   lending: [
  //     { label: "Total value locked", value: pools[0]?.funds.toFixed(2) },
  //     { label: "Total earned", value: pools[0]?.earned.toFixed(2) }
  //   ],
  //   borrowing: [
  //     { label: "Total borrowed", value: "-" },
  //     { label: "Total money saved", value: "-" }
  //   ]
  // };

  return (
    <VStack
      direction="column"
      divider={<StackDivider borderColor="#1F1F1F" />}
      mb="22px"
      w="100%"
      order={{ base: 0, md: 1 }}
    >
      {/* <StackDivider /> */}

      {/* <Flex justify="space-between" w="100%" gap="10px" color="black.5" p="16px">
        {infoMock[pathName as ROUTES_TYPE]?.map((elem, i) => (
          <Flex key={i}>
            <Text>{elem.label}:</Text>
            <Text>{elem.value}</Text>
          </Flex>
        ))}
      </Flex> */}

      <Flex w="100%" px="16px" gap="8px">
        {performanceInfo.map(elem => (
          <Flex
            // as={NavLink}
            // to={`/${elem.type}`}
            key={elem.title}
            textAlign="center"
            borderRadius="3px"
            // border="1px solid"
            p="8px 12px"
            w="100%"
            color={elem.type !== pathName ? "" : "black"}
            // borderColor={elem.type === pathName ? "greenAlpha.100" : "#1F1F1F"}
            justifyContent="center"
            alignItems="center"
            bg={elem.type === pathName ? "greenAlpha.100" : "#282a31"}
          >
            {elem.title}
          </Flex>
        ))}
      </Flex>
    </VStack>
  );
};
