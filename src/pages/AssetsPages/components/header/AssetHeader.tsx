import { Flex, Text } from "@chakra-ui/layout";
import React, { FC } from "react";
import { useLocation } from "react-router";
import { useAccount } from "wagmi";

import { Risk } from "../../../../components/risk";
import { riskBgColor, riskColor } from "../../../../components/risk/utils";
import { TokenIcon } from "../../../../components/token-icon";
import { CHAIN_NAMES } from "../../../../consts";
import { ROUTES_TYPE } from "../../../../consts/routes-type";
import { getCurrentPath } from "../../../../features/RebalancePerformance/utils";
import { formatNumber } from "../../../../utils/formatNumber";

export const AssetHeader: FC<any> = ({ pool }) => {
  const location = useLocation();
  const pathName = getCurrentPath(location.pathname);
  const { chain } = useAccount();

  return (
    <Flex w="100%" h="fit-content" align="center" justify="space-between">
      <Flex align="center" gap="48px">
        <Flex gap="8px" align="inherit">
          <TokenIcon name={pool.token} />
          <Flex direction="column" gap="8px">
            <Text>
              {pool.token} ({CHAIN_NAMES[chain?.id ?? 0]})
            </Text>
            <Flex align="center" gap="10px" fontSize="xl" fontWeight="500">
              <Text textTransform="uppercase">{pool.token}</Text>
              <Text>Coin</Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex direction="column" gap="8px">
          <Text>Average 30D APR</Text>
          <Text variant="t22">{pool.avgApr}%</Text>
        </Flex>

        <Flex direction="column" gap="8px">
          <Text>Total supply</Text>
          <Text variant="t22">{formatNumber(pool.funds)}</Text>
        </Flex>
      </Flex>

      {ROUTES_TYPE.lending === pathName && (
        <Flex p="16px 24px" gap="24px" border="2px solid #0F0F0F" borderRadius="4px">
          <Flex direction="column" gap="8px">
            <Text>Risk Factor</Text>
            <Text
              p="0 10px"
              bg={riskBgColor[pool.risk]}
              w="fit-content"
              fontSize="xl"
              fontWeight="500"
              color={riskColor[pool.risk]}
              borderRadius="4px"
            >
              {pool.risk}/5
            </Text>
          </Flex>
          <Risk risk={pool.risk} w="12px" h="50px" gap="12px" />

          <Flex direction="column" gap="8px" color="#D2D2D2" justify="center">
            <Text textStyle="text12">Asset risk - {pool.risk}</Text>
            <Text textStyle="text12">Protocols risk - {pool.risk}</Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};
