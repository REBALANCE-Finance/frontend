import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

import { useBalanceOfAsset } from "../../../../hooks/useBalanceOfAsset";
import { formatNumber } from "../../../../utils/formatNumber";

interface DepositInfoProps {
  contractAddress: `0x${string}`;
  ownerAddress: `0x${string}`;
}

const DepositInfo: React.FC<DepositInfoProps> = ({ contractAddress, ownerAddress }) => {
  const { balance, isLoading } = useBalanceOfAsset(contractAddress, ownerAddress);

  if (isLoading) {
    return <Spinner size="sm" />;
  }

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="md" fontWeight="500" color="whiteAlpha.70">
        My Deposit
      </Text>
      <Text textStyle="textMono16">{formatNumber(balance)} USDC</Text>
    </Flex>
  );
};

export default DepositInfo;
