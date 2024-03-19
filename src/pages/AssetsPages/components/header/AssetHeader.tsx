import { Flex, Text } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/react";
import React, { FC } from "react";
import { useLocation } from "react-router";

import { Risk } from "../../../../components/risk";
import { riskBgColor, riskColor } from "../../../../components/risk/utils";
import { TokenIcon } from "../../../../components/token-icon";
import { MEDIA_QUERY_MAX } from "../../../../consts";
import { ROUTES_TYPE } from "../../../../consts/routes-type";
import { getCurrentPath } from "../../../../features/RebalancePerformance/utils";
import { formatNumber } from "../../../../utils/formatNumber";

export const AssetHeader: FC<any> = ({ pool }) => {
  const location = useLocation();
  const pathName = getCurrentPath(location.pathname);
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);

  if (media) {
    return (
      <Flex w="100%" h="fit-content" flexDirection="column">
        <Flex gap="24px" flexDirection="column">
          <Flex gap="8px" align="inherit">
            <TokenIcon name={pool.token} size="32px" sizeIcon="22px" />
            <Flex direction="row" gap="8px" alignItems="center">
              <Flex gap="10px" textStyle="h1" fontWeight="500" lineHeight="24px">
                <Text textTransform="uppercase">{pool.token}</Text>
                <Text>Coin</Text>
              </Flex>
              <Text display="flex" flexDirection="row" mt="4px">
                {/* {pool.token} ({CHAIN_NAMES[chain?.id ?? 0]}) */}
                <Text textTransform="uppercase">{pool.token}</Text>
                <Text>(Arbitrum)</Text>
              </Text>
            </Flex>
          </Flex>

          <Flex flexDirection="column" fontWeight="500">
            <Flex justifyContent="space-between" alignItems="center">
              <Text>Average 30D APR</Text>
              <Text variant="t22">{pool.avgApr.toFixed(2)}%</Text>
            </Flex>
            <Flex justifyContent="space-between" alignItems="center">
              <Text>Total supply</Text>
              <Text variant="t22">$ {formatNumber(pool.funds.toFixed(2))}</Text>
            </Flex>
          </Flex>
        </Flex>

        {ROUTES_TYPE.lending === pathName && (
          <Flex gap="24px" mt="28px" justifyContent="space-between">
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

            <Flex direction="column" gap="8px" color="#D2D2D2" justify="center" lineHeight="14px">
              <Text textStyle="text12">Asset risk - {pool.risk}</Text>
              <Text textStyle="text12">Protocols risk - {pool.risk}</Text>
            </Flex>
          </Flex>
        )}
      </Flex>
    );
  }

  return (
    <Flex w="100%" h="fit-content" align="center" justify="space-between">
      <Flex align="center" gap="48px" flexDirection={media ? "column" : "row"}>
        <Flex gap="8px" align="inherit">
          <TokenIcon name={pool.token} />
          <Flex direction="column" gap="8px">
            <Text>
              {/* {pool.token} ({CHAIN_NAMES[chain?.id ?? 0]}) */}
              {pool.token?.toString().toUpperCase()} (Arbitrum)
            </Text>
            <Flex align="center" gap="10px" fontSize="xl" fontWeight="500">
              <Text textTransform="uppercase">{pool.token}</Text>
              <Text>Coin</Text>
            </Flex>
          </Flex>
        </Flex>

        <Flex direction="column" gap="8px">
          <Text>Average 30D APR</Text>
          <Text variant="t22">{pool.avgApr.toFixed(2)}%</Text>
        </Flex>

        <Flex direction="column" gap="8px">
          <Text>Total supply</Text>
          <Text variant="t22">$ {formatNumber(pool.funds.toFixed(2))}</Text>
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
