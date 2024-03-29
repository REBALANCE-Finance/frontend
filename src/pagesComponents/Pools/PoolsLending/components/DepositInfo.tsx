import { Flex, Spinner, Text } from "@chakra-ui/react";
import React from "react";

import { useBalanceOfAsset } from "../../../../hooks/useBalanceOfAsset";
import { formatNumber } from "../../../../utils/formatNumber";

interface DepositInfoProps {
  contractAddress: `0x${string}`;
  ownerAddress: `0x${string}`;
  tokenName: string;
}

const DepositInfo: React.FC<DepositInfoProps> = ({ contractAddress, ownerAddress, tokenName }) => {
  const { balance, isLoading } = useBalanceOfAsset(contractAddress, ownerAddress);

  if (isLoading) {
    return <Spinner size="sm" />;
  }

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="md" fontWeight="500" color="whiteAlpha.70">
        My Deposit
      </Text>
      <Text textStyle="textMono16">{formatNumber(balance.toFixed(2))} {tokenName.toUpperCase()}</Text>
    </Flex>
  );
};

export default DepositInfo;
