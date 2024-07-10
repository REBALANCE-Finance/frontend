import { Flex, Text } from "@chakra-ui/react";

const WarningBlock = () => {
  return (
    <Flex justify="center" alignItems="center" p="12px 16px" bg="black.80">
      <Text color="lightGray" fontWeight={700}>
        Transition to Version 2.0: Withdrawals Only
      </Text>
    </Flex>
  );
};

export default WarningBlock;
