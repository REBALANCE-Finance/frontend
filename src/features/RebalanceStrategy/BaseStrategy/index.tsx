import { Box, Flex, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";
import { useAccount } from "wagmi";

import { MEDIA_QUERY_MAX } from "../../../consts";
import { useBalanceOfAsset } from "../../../hooks/useBalanceOfAsset";
import { DepositLendingButton } from "../../actions/deposit-or-withdraw-button/DepositLendingButton";
import { WithdrawLendingButton } from "../../actions/deposit-or-withdraw-button/WithdrawLendingButton";
import { BaseChart } from "./BaseChart";
import EarningsChart from "./EarningsChart";

const BaseStrategy: React.FC<any> = ({ pool }) => {
  console.log(pool.rebalancerAddress, "pool");
  const { address } = useAccount();
  const { balance } = useBalanceOfAsset(pool.rebalancerAddress, address ?? "0x");
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  return (
    <SimpleGrid columns={media ? 1 : 2} gap="24px">
      <Flex direction="column">
        <Text textStyle="text14" color="#9FA2A8">
          My deposit
        </Text>
        <Box mt="16px" mb="24px" display="flex" flexDirection="row" alignItems="baseline">
          <Text fontWeight="400" fontSize="24px" lineHeight="24px" textTransform="uppercase">
            {balance.toFixed(2)} {pool?.token}
          </Text>
          <Text textStyle="text14" color="#9FA2A8" ml="16px">
            {balance.toFixed(2)} $
          </Text>
        </Box>
        <SimpleGrid columns={2} gap="8px">
          <DepositLendingButton variant="primaryWhite" pool={pool} />
          <WithdrawLendingButton pool={pool} disabled={balance <= 0} />
        </SimpleGrid>
        <Flex>
          <EarningsChart />
        </Flex>
      </Flex>

      <Flex w="100%" bg="#17191C" borderRadius="8px" minH="319px" padding="24px">
        <BaseChart />
      </Flex>
    </SimpleGrid>
  );
};
export default BaseStrategy;
