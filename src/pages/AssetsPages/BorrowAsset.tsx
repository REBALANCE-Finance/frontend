import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useParams } from "react-router-dom";

import { mockData } from "../../api/pools/queries";
import { AssetHeader } from "./components/header/AssetHeader";

export const BorrowAsset = () => {
  const { poolAddress } = useParams();
  const pool = mockData.find(item => item.rebalancerAddress === poolAddress);
  return (
    <Flex h="100%" w="100%">
      <AssetHeader pool={pool} />
    </Flex>
  );
};
