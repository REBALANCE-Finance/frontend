import { Box, Flex, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { useAccount } from "wagmi";

import { MEDIA_QUERY_MAX } from "../../../consts";
import { useBalanceOfAsset } from "../../../hooks/useBalanceOfAsset";
import { DepositLendingButton } from "../../actions/deposit-or-withdraw-button/DepositLendingButton";
import { WithdrawLendingButton } from "../../actions/deposit-or-withdraw-button/WithdrawLendingButton";
import { BaseChart } from "./BaseChart";
import EarningsChart from "./EarningsChart";


const BaseStrategy: React.FC<any> = ({ pool, chartData }) => {
  const { address } = useAccount();
  const { balance } = useBalanceOfAsset(pool.rebalancerAddress, address ?? "0x");
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);  

  return (
    <SimpleGrid columns={media ? 1 : 2} gap="24px">
      <Flex direction="column">
        <Flex direction="column" bg="#17191C" borderRadius="8px" padding="24px">
          <Text fontSize="lg">My deposit</Text>
          <Box mt="16px" mb="24px" display="flex" flexDirection="row" alignItems="baseline">
            <Text fontWeight="400" fontSize="24px" lineHeight="24px" textTransform="uppercase">
              {balance.toFixed(2)} {pool?.token}
            </Text>
            <Text textStyle="text14" color="#9FA2A8" ml="16px">
              {balance.toFixed(2)} $
            </Text>
          </Box>
          <SimpleGrid columns={!media || balance > 0 ? 2 : 1} gap="8px">
            <DepositLendingButton variant="primaryWhite" pool={pool} />
            {balance > 0 && <WithdrawLendingButton pool={pool} />}
          </SimpleGrid>
        </Flex>
        <Flex>
          <EarningsChart />
        </Flex>
      </Flex>

      <Flex w="100%" bg="#17191C" borderRadius="8px" minH="319px" padding="24px">
        <BaseChart chartData={chartData}/>
      </Flex>
    </SimpleGrid>
  );
};
export default BaseStrategy;
