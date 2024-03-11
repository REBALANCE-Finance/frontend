import { Box, Button, Flex, SimpleGrid, Text, useMediaQuery } from "@chakra-ui/react";

import { MEDIA_QUERY_MAX } from "../../../consts";
import { BaseChart } from "./BaseChart";
import EarningsChart from "./EarningsChart";

const BaseStrategy: React.FC = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  return (
    <SimpleGrid columns={media ? 1 : 2} gap="24px">
      <Flex direction="column">
        <Text textStyle="text14" color="#9FA2A8">
          My deposit
        </Text>
        <Box mt="16px" mb="24px" display="flex" flexDirection="row" alignItems="baseline">
          <Text fontWeight="400" fontSize="24px" lineHeight="24px">
            1.000,3 USDC
          </Text>
          <Text textStyle="text14" color="#9FA2A8" ml="16px">
            999.29 $
          </Text>
        </Box>
        <SimpleGrid columns={2} gap="8px">
          <Button height="44px" variant="primaryWhite">
            Deposit
          </Button>
          <Button height="44px" variant="outline">
            Withdraw
          </Button>
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
