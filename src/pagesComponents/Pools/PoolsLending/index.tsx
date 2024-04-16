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
import { formatNumber, formatPercent, formatNeutralPercent } from "../../../utils/formatNumber";
import { IPoolData, IRowCard, RowCardNames, RowCardProccessType } from "../types";
import DepositInfo from "./components/DepositInfo";
import { useRouter } from 'next/navigation'

export const PoolsLending = observer(({ pools } : {
  pools: IPoolData[]
}) => {
  const router = useRouter();
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
            <Tooltip label={<span>Asset risk - 1<br />Protocols risk - 1</span>} color="white">
              <Text textStyle="textMono12" letterSpacing="3px" color="gray.100">RISK</Text>
            </Tooltip>
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
                    <Text textStyle="textMono16" color="white">
                      {formatNumber(item.funds)} $
                    </Text>
                  </Tooltip>
                </HStack>

                <HStack justify="space-between">
                <Tooltip label="Historical earnings of this vault" color="white">
                  <Text borderBottom={"dashed 1px gray"} color="white">Profit Earned</Text>
                </Tooltip>
                <Text textStyle="textMono16">{formatNumber(item.earned)} $</Text>
                </HStack>

                <HStack justify="space-between">
                  <Tooltip label="Average profitability in last 30 days">
                    <Text color="white" borderBottom={"dashed 1px gray"}>
                      30D avg. APR
                    </Text>
                  </Tooltip>
                  <Text textStyle="textMono16">{formatNeutralPercent(item.avgApr)}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Tooltip label="Rebalance APR  advantage over the market average APR in last 30 days">
                    <Text borderBottom={"dashed 1px gray"} color="white">APR {">"} market</Text>
                  </Tooltip>
                  <Text color={item.apr > 0 ? "green.100" : "white"} textStyle="textMono16">
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
                    <DepositInfo contractAddress={item.rebalancerAddress} ownerAddress={address} tokenName={item?.token} decimals={item.decimals} />
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
