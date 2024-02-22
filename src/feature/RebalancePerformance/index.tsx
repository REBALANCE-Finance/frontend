import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";

import BorrowImage from "../../assets/image/Borrow.svg";
import LendImage from "../../assets/image/Lend.svg";
import { RebalancePerformanceCard } from "./RebalancePerformanceCard";
import { PerformanceChart } from "./RebalancePerformanceCharts";
import { PERFORMANCE_TYPE } from "./utils";

export const RebalancePerformance = () => {
  const [activeType, setActiveType] = useState<keyof typeof PERFORMANCE_TYPE>(
    PERFORMANCE_TYPE.lend
  );

  const handleActive = (type: keyof typeof PERFORMANCE_TYPE) => {
    setActiveType(type);
  };

  return (
    <Flex gap="24px">
      <Flex direction="column" gap="12px">
        <RebalancePerformanceCard
          image={LendImage}
          title="I want to Lend"
          subtitle="Low-risk investments. Up to 16% APR in stablecoins."
          onClick={() => handleActive(PERFORMANCE_TYPE.lend)}
          info={[
            { lable: "Total value locked", value: "100000" },
            { lable: "Total earned", value: "100000" }
          ]}
          isActive={PERFORMANCE_TYPE.lend === activeType}
        />
        <RebalancePerformanceCard
          image={BorrowImage}
          title="I want to Borrow"
          subtitle="The lowest borrowing rates in the market."
          onClick={() => handleActive(PERFORMANCE_TYPE.borrow)}
          info={[
            { lable: "Total borrowed", value: "100000" },
            { lable: "Total money saved", value: "100000" }
          ]}
          isActive={PERFORMANCE_TYPE.borrow === activeType}
        />
      </Flex>

      <Flex w="100%">
        <PerformanceChart activeType={activeType} />
      </Flex>
    </Flex>
  );
};
