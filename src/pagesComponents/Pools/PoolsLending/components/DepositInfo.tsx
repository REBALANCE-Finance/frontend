import { Flex, Skeleton, Text, TextProps } from "@chakra-ui/react";
import React from "react";

import { useBalanceOfAsset } from "../../../../hooks/useBalanceOfAsset";
import { formatNumber } from "../../../../utils/formatNumber";

interface DepositInfoProps {
  contractAddress: `0x${string}`;
  ownerAddress: `0x${string}`;
  tokenName: string;
  decimals: number;
  noTitle?: boolean;
  noSymbol?: boolean;
  TextProps?: TextProps;
}

const DepositInfo: React.FC<DepositInfoProps> = ({
  contractAddress,
  ownerAddress,
  tokenName,
  decimals,
  noTitle,
  noSymbol,
  TextProps
}) => {
  const { balance, isLoading } = useBalanceOfAsset(contractAddress, ownerAddress, decimals);

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {!noTitle && (
        <Text fontSize="md" fontWeight="500" color="whiteAlpha.70">
          My Deposit
        </Text>
      )}
      {isLoading ? (
        <Skeleton height="20px" width="50px" />
      ) : (
        <Text textStyle="textMono16" {...TextProps}>
          {formatNumber(balance.toFixed(2))} {!noSymbol && tokenName}
        </Text>
      )}
    </Flex>
  );
};

export default DepositInfo;
