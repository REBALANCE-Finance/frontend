'use client'

import { Flex } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useParams } from 'next/navigation'

import { storesContext } from "../../store/app.store";
import { AssetHeader } from "./components/header/AssetHeader";
import { IPoolData } from "../Pools/types";

export const BorrowAsset = observer(({ pools } : {
  pools: IPoolData[]
}) => {
  const { poolsStore } = useContext(storesContext);
  const { poolAddress } = useParams();
  const finalAddress = Array.isArray(poolAddress) ? poolAddress[0] : poolAddress;

  useEffect(() => {
    if (!poolsStore.isLoading && poolsStore.pools.length === 0) {
      poolsStore.fetchPools("lending");
    }
  }, [poolsStore]);

  const pool = poolsStore.pools.find(item => item.rebalancerAddress === finalAddress);

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
