"use client";

import { Flex } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useParams } from "next/navigation";

import { storesContext } from "../../store/app.store";
import { AssetHeader } from "./components/header/AssetHeader";
import { IPoolData } from "../Pools/types";
import { ILendChartData } from "@/api/pools/types";

interface IChartData {
  chartData: ILendChartData[];
  poolChart: any[];
}

export const BorrowAsset = observer(
  ({ pools, chartData }: { pools: IPoolData[]; chartData: IChartData }) => {
    const { poolAddress } = useParams();
    const finalAddress = Array.isArray(poolAddress) ? poolAddress[0] : poolAddress;

    const pool = pools.find(item => item.rebalancerAddress === finalAddress);

    if (!pools) {
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
        {/* <AssetHeader pool={pool} /> */}
      </Flex>
    );
  }
);
