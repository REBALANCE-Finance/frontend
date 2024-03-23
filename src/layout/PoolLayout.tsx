'use client'

import { Flex, useMediaQuery } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { storesContext } from "@/store/app.store";

import { MEDIA_QUERY_MAX } from "../consts";
import { RebalancePerformance, RebalancePerformanceMob } from "../features/RebalancePerformance";
import { PoolsHeader } from "../pages/Pools/PoolsHeader";

export const PoolLayout = ({ children } : {
  children: React.ReactNode;
}) => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  const { poolsStore } = useContext(storesContext);
  useEffect(() => {
    poolsStore.fetchPools("lending");
  }, [poolsStore]);

  if (media) {
    return (
      <Flex direction="column" w="100%" align="center">
        {/* <AppBanner /> */}
        <RebalancePerformanceMob />
        <Flex direction="column" gap="24px" p={{ base: "16px", xl: 0 }} w="100%">
          <PoolsHeader />
          {children}
        </Flex>
        <Flex
          direction="column"
          justify="center"
          gap="44px"
          maxW="1300px"
          w="100%"
          p={{ base: "16px", xl: 0 }}
          order={{ base: 3 }}
        >
          {poolsStore?.pools ? <RebalancePerformance pools={poolsStore?.pools} /> : null}
        </Flex>
      </Flex>
    );
  }

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
        {poolsStore?.pools ? <RebalancePerformance pools={poolsStore?.pools} /> : null}
        <Flex direction="column" gap="24px">
          <PoolsHeader />
          <Outlet />
        </Flex>
      </Flex>
    </Flex>
  );
};
