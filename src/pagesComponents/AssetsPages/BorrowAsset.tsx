'use client'

import { Flex } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import { storesContext } from "../../store/app.store";
import { AssetHeader } from "./components/header/AssetHeader";

export const BorrowAsset = observer(() => {
  const { poolsStore } = useContext(storesContext);
  const { poolAddress } = useParams();

  useEffect(() => {
    if (!poolsStore.isLoading && poolsStore.pools.length === 0) {
      poolsStore.fetchPools("lending");
    }
  }, [poolsStore]);

  const pool = poolsStore.pools.find(item => item.rebalancerAddress === poolAddress);

  if (poolsStore.isLoading) {
    return (
      <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
        Loading...
      </Flex>
    );
  }

  if (!pool) {
    return (
      <Flex h="100%" w="100%" justifyContent="center" alignItems="center">
        Pool not found
      </Flex>
    );
  }

  return (
    <Flex h="100%" w="100%">
      <AssetHeader pool={pool} />
    </Flex>
  );
});
