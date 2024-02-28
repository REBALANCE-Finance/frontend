import { Divider, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

import { Card } from "../../../components/card";
import { Risk } from "../../../components/risk";
import { DepositLendingButton } from "../../../features/actions/deposit-or-withdraw-button/DepositLendingButton";
import { WithdrawLendingButton } from "../../../features/actions/deposit-or-withdraw-button/WithdrawLendingButton";
import { IRowCard, RowCardNames, RowCardProccessType } from "../types";

interface IMockData {
  token: string;
  tokenAddress: string;
  rebalancerAddress: string;
  icon: string;
  tokenPriceInUsd: number;
  tokenPrice24HrChangeInPercentages: number;
  tokenPrice24HrChangeInUsd: number;
  apy: number;
  supply: number;
  reserves: number;
  earned30Days: number;
  decimals: number;
  deposit: number;
  risk: number;
}

const mockData: IMockData[] = [
  {
    token: "usdt",
    tokenAddress: "ffsdfsdfsdfdsf",
    rebalancerAddress: "fdsfdsfsdfsf",
    icon: "arbitrum",
    tokenPriceInUsd: 1,
    tokenPrice24HrChangeInPercentages: 1,
    tokenPrice24HrChangeInUsd: 1,
    apy: 1,
    supply: 1,
    reserves: 1,
    earned30Days: 1,
    decimals: 1,
    deposit: 1,
    risk: 1
  },
  {
    token: "usdc",
    tokenAddress: "",
    rebalancerAddress: "",
    icon: "arbitrum",
    tokenPriceInUsd: 1,
    tokenPrice24HrChangeInPercentages: 1,
    tokenPrice24HrChangeInUsd: 1,
    apy: 1,
    supply: 1,
    reserves: 1,
    earned30Days: 1,
    decimals: 1,
    deposit: 0,
    risk: 2
  },
  {
    token: "eth",
    tokenAddress: "",
    rebalancerAddress: "",
    icon: "arbitrum",
    tokenPriceInUsd: 1,
    tokenPrice24HrChangeInPercentages: 1,
    tokenPrice24HrChangeInUsd: 1,
    apy: 1,
    supply: 1,
    reserves: 1,
    earned30Days: 1,
    decimals: 1,
    deposit: 0,
    risk: 3
  },
  {
    token: "btc",
    tokenAddress: "",
    rebalancerAddress: "",
    icon: "arbitrum",
    tokenPriceInUsd: 1,
    tokenPrice24HrChangeInPercentages: 1,
    tokenPrice24HrChangeInUsd: 1,
    apy: 1,
    supply: 1,
    reserves: 1,
    earned30Days: 1,
    decimals: 1,
    deposit: 1,
    risk: 5
  }
];

export const PoolsLending = () => {
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
                  <Text color="black.0">Funds in pool</Text>
                  <Text textStyle="textMono16">22.56M</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text color="black.0">Profit Earned</Text>
                  <Text textStyle="textMono16">22.56M</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text color="darkGray">30D avg. APR</Text>
                  <Text textStyle="textMono16">22.56M</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text color="black.0">GLIA APR {">"} market avg.</Text>
                  <Text color={item.apy > 0 ? "green.100" : "red"} textStyle="textMono16">
                    1.5%
                  </Text>
                </HStack>
              </>
            );
          case RowCardProccessType.assets:
            return (
              <>
                {!!item.deposit && (
                  <>
                    <Divider borderColor="black.60" />
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text>My Deposit</Text>
                      <Text textStyle="textMono16">1.000</Text>
                    </Flex>
                  </>
                )}
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
            {!!item.deposit && <WithdrawLendingButton pool={item} />}
          </>
        );
      }
    }
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing="24px">
      {mockData.map(elem => (
        <Card key={elem.token} rowCard={rowCard} itemCard={elem} />
      ))}
    </SimpleGrid>
  );
};
