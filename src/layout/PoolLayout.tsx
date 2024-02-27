import { Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

import { RebalancePerformance } from "../features/RebalancePerformance";
import { PoolsHeader } from "../pages/Pools/PoolsHeader";

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
