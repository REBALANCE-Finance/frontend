import { Button, Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

import { Card } from "../../../components/card";
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
    icon: "",
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
    icon: "",
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
    icon: "",
    tokenPriceInUsd: 1,
    tokenPrice24HrChangeInPercentages: 1,
    tokenPrice24HrChangeInUsd: 1,
    apy: 1,
    supply: 1,
    reserves: 1,
    earned30Days: 1,
    decimals: 1,
    deposit: 1,
    risk: 4
  }
];

export const PoolsBorrow = () => {
  const rowCard: IRowCard[] = [
    {
      name: RowCardNames.header
    },
    {
      name: RowCardNames.body,
      proccess({ type }) {
        switch (type) {
          case RowCardProccessType.metrics:
            return (
              <>
                <Flex justify="space-between" align="center">
                  <Text color="black.0">Borrowing rate</Text>
                  <Text textStyle="textMono16">12.6 %</Text>
                </Flex>

                <Flex justify="space-between" align="center">
                  <Text color="black.0">Total borrowed</Text>
                  <Text>22.56M</Text>
                </Flex>
              </>
            );
          case RowCardProccessType.assets:
            return (
              <>
                <Divider borderColor="black.60" />
                <Flex alignItems="center" justifyContent="space-between">
                  <Text>My Borrow</Text>
                  <Text>1.000</Text>
                </Flex>
              </>
            );
          default:
            return <></>;
        }
      }
    },
    {
      name: RowCardNames.footer,
      proccess() {
        return (
          <>
            <Button variant="primaryFilled" flex="1 1 0">
              Deposit
            </Button>
            <Button variant="primaryWhite" flex="1 1 0">
              Withdraw
            </Button>
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
