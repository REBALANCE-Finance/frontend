import { Box, Flex, Text } from "@chakra-ui/react";
const BaseStrategy: React.FC = () => {
  return (
    <Flex gap="24px">
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
      </Flex>
    </Flex>
  );
};
export default BaseStrategy;