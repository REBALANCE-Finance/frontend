import { Flex, Skeleton, Text, TextProps } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useBalanceOfAsset } from "../../../../hooks/useBalanceOfAsset";
import { formatNumber } from "../../../../utils/formatNumber";
import { useAccount } from "wagmi";
import { getLocks } from "@/api/points/queries";
import { formatBigNumber } from "@/utils/formatBigNumber";

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
  const { address } = useAccount();
  const { balance, isLoading } = useBalanceOfAsset(contractAddress, ownerAddress, decimals);
  const [lockedBalance, setLockedBalance] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    if (address) {
      getLocks(address, tokenName).then(data => {
        const amountsBigInt = data.map(item => item.amount);
        const amountsNumbers = amountsBigInt.map(item => Number(formatBigNumber(item, decimals)));

        const totalLockedAmount = amountsNumbers.reduce((acc, item) => acc + item, 0);
        setLockedBalance(totalLockedAmount);
      });
    }
  }, [address]);

  useEffect(() => {
    if (lockedBalance > 0) {
      setTotalBalance(balance + lockedBalance);
    }
  }, [lockedBalance]);

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
          {formatNumber(totalBalance.toFixed(2))} {!noSymbol && tokenName}
        </Text>
      )}
    </Flex>
  );
};

export default DepositInfo;
