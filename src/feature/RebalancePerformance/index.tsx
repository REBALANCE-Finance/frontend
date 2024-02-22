import { Flex } from "@chakra-ui/react";
import React from "react";
import { useLocation } from "react-router-dom";

import BorrowImage from "../../assets/image/Borrow.svg";
import LendImage from "../../assets/image/Lend.svg";
import { RebalancePerformanceCard } from "./RebalancePerformanceCard";
import { PerformanceChart } from "./RebalancePerformanceCharts";
import { getCurrentPath, PERFORMANCE_TYPE } from "./utils";

export const RebalancePerformance = () => {
  const location = useLocation();
  const pathName = getCurrentPath(location.pathname);

  return (
    <Flex gap="24px">
      <Flex direction="column" gap="12px">
        <RebalancePerformanceCard
          image={LendImage}
          title="I want to Lend"
          subtitle="Low-risk investments. Up to 16% APR in stablecoins."
          info={[
            { lable: "Total value locked", value: "100000" },
            { lable: "Total earned", value: "100000" }
          ]}
          isActive={PERFORMANCE_TYPE.lending === pathName}
        />
        <RebalancePerformanceCard
          image={BorrowImage}
          title="I want to Borrow"
          subtitle="The lowest borrowing rates in the market."
          info={[
            { lable: "Total borrowed", value: "100000" },
            { lable: "Total money saved", value: "100000" }
          ]}
          isActive={PERFORMANCE_TYPE.borrowing === pathName}
        />
      </Flex>

      <Flex w="100%">
        <PerformanceChart activeType={pathName} />
      </Flex>
    </Flex>
  );
};
