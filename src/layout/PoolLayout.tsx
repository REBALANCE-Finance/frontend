import { Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

import { PoolsHeader } from "../feature/Pools/PoolsHeader";
import { RebalancePerformance } from "../feature/RebalancePerformance";

export const PoolLayout = () => {
  return (
    <Flex direction="column" w="100%" px={{ base: "16px", xxl: "0" }} gap="44px">
      <RebalancePerformance />
      <Flex direction="column" justify="center" gap="24px">
        <PoolsHeader />
        <Outlet />
      </Flex>
    </Flex>
  );
};
