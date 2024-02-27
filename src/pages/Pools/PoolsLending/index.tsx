import { Button, Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";

import { Card } from "../../../components/card";
import { Risk } from "../../../components/risk";
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
    risk: 4
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
                <Flex justify="space-between" align="center">
                  <Text color="black.0">Funds in pool</Text>
                  <Text textStyle="textMono16">22.56M</Text>
                </Flex>

                <Flex justify="space-between" align="center">
                  <Text color="black.0">Profit Earned</Text>
                  <Text>22.56M</Text>
                </Flex>

                <Flex justify="space-between" align="center">
                  <Text color="darkGray">30D avg. APR</Text>
                  <Text>22.56M</Text>
                </Flex>

                <Flex justify="space-between" align="center">
                  <Text color="black.0">GLIA APR {">"} market avg.</Text>
                  <Text color={true ? "green.100" : "red"}>1.5%</Text>
                </Flex>
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
                      <Text>1.000</Text>
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
            <Button variant="primaryFilled" flex="1 1 0">
              Deposit
            </Button>
            {!!item.deposit && (
              <Button variant="secondaryOutline" flex="1 1 0">
                Withdraw
              </Button>
            )}
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
