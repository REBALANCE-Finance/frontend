import { Flex, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

import { MEDIA_QUERY_MAX } from "../consts";
import { RebalancePerformance, RebalancePerformanceMob } from "../features/RebalancePerformance";
import { PoolsHeader } from "../pages/Pools/PoolsHeader";

export const PoolLayout = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);

  return (
    <Flex direction="column" w="100%" gap="44px" align="center">
      {/* <AppBanner /> */}
      {media && <RebalancePerformanceMob />}

      <Flex
        direction="column"
        justify="center"
        gap="44px"
        maxW="1300px"
        w="100%"
        p={{ base: "16px", xl: 0 }}
        order={{ base: 3 }}
      >
        <RebalancePerformance />
        <Flex direction="column" gap="24px">
          <PoolsHeader />
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};
