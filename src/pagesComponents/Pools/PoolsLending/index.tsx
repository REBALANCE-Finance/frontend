'use client'

import { Divider, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { generatePath, useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

import { CardPool } from "../../../components/card";
import { Risk } from "../../../components/risk";
import { Tooltip } from "../../../components/tooltip";
import { ROUTE_PATHS } from "../../../consts";
import { DepositLendingButton } from "../../../features/actions/deposit-or-withdraw-button/DepositLendingButton";
import { WithdrawLendingButton } from "../../../features/actions/deposit-or-withdraw-button/WithdrawLendingButton";
import { formatNumber, formatPercent } from "../../../utils/formatNumber";
import { IPoolData, IRowCard, RowCardNames, RowCardProccessType } from "../types";
import DepositInfo from "./components/DepositInfo";
import { useRouter } from 'next/navigation'

export const PoolsLending = observer(({ pools } : {
  pools: IPoolData[]
}) => {
  const router = useRouter()
  const { address } = useAccount();

  const handleLink = (poolAddress: string) => {
    router.push(generatePath(ROUTE_PATHS.lendingAsset, { poolAddress }));
  };
  const rowCard: IRowCard[] = [
    {
      name: RowCardNames.header,
      proccess({ item }) {
        return (
          <Flex direction="column" alignItems="center">
            <Text fontFamily="Roboto mono" fontSize="xs" color="gray.100">
              RISK
            </Text>
            <Risk risk={item.risk} />
          </Flex>
        );
      }
    },
    {
      name: RowCardNames.body,
      proccess({ item, type }) {
        switch (type) {
          case RowCardProccessType.metrics:
            return (
              <>
                <HStack justify="space-between">
                  <Text color="white">Funds in pool</Text>
                  <Tooltip label="Funds in pool" color="white">
                    <Text variant="tooltip" textStyle="textMono16" color="white">
                      {formatNumber(item.funds)} $
                    </Text>
                  </Tooltip>
                </HStack>

                <HStack justify="space-between">
                  <Text color="white">Profit Earned</Text>
                  <Text textStyle="textMono16">{formatNumber(item.earned)} $</Text>
                </HStack>

                <HStack justify="space-between">
                  <Tooltip label="APR INFO">
                    <Text color="white" variant="tooltip">
                      30D avg. APR
                    </Text>
                  </Tooltip>
                  <Text textStyle="textMono16">{formatPercent(item.avgApr)}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text color="white">APR {">"} market avg.</Text>
                  <Text color={item.apr > 0 ? "green.100" : "red"} textStyle="textMono16">
                    {formatPercent(item.apr)}
                  </Text>
                </HStack>
              </>
            );
          case RowCardProccessType.assets:
            return (
              <>
                {!!address ? (
                  <>
                    <Divider borderColor="black.60" />
                    <DepositInfo contractAddress={item.rebalancerAddress} ownerAddress={address} tokenName={item?.token} />
                  </>
                ) : null}
              </>
            );
          default:
            return <></>;
        }
      }
    },
    {
      name: RowCardNames.footer,
      proccess({ item }) {
        return (
          <>
            <DepositLendingButton pool={item} />
            <WithdrawLendingButton pool={item} />
          </>
        );
      }
    }
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3, xl: 4 }} spacing="24px">
      {pools.map(elem => (
        <CardPool
          key={elem.token}
          rowCard={rowCard}
          itemCard={elem}
          onClick={() => handleLink(elem.rebalancerAddress)}
        />
      ))}
    </SimpleGrid>
  );
});
