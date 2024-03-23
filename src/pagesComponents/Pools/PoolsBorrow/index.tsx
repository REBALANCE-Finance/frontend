'use client'

import { Box, Divider, Flex, HStack, SimpleGrid, Spinner, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { CardPool } from "../../../components/card";
import { Tooltip } from "../../../components/tooltip";
import { ROUTE_PATHS } from "../../../consts";
import { BorrowButton } from "../../../features/actions/borrow-or-repay-button/BorrowButton";
import { RepayButton } from "../../../features/actions/borrow-or-repay-button/RepayButton";
import { storesContext } from "../../../store/app.store";
import { formatNumber, formatPercent } from "../../../utils/formatNumber";
import { IPoolData, IRowCard, RowCardNames, RowCardProccessType } from "../types";
import { useRouter } from "next/navigation";

export const PoolsBorrow = observer(() => {
  const { poolsStore } = useContext(storesContext);
  const router = useRouter();

  useEffect(() => {
    poolsStore.fetchPools("lending");
  }, [poolsStore]);

  const handleLink = (poolAddress: string) => {
    router.push(generatePath(ROUTE_PATHS.borrowingAsset, { poolAddress }));
  };

  if (poolsStore.isLoading && poolsStore.pools.length === 0) {
    return (
      <Flex justifyContent="center" alignItems="center" h="100vh">
        <Spinner />
      </Flex>
    );
  }

  if (poolsStore.error) {
    return <Box textAlign="center">Error loading pools: {poolsStore.error.message}</Box>;
  }

  const rowCard: IRowCard[] = [
    {
      name: RowCardNames.header
    },
    {
      name: RowCardNames.body,
      proccess({ item, type }) {
        switch (type) {
          case RowCardProccessType.metrics:
            return (
              <>
                <HStack justify="space-between">
                  <Text color="black.0">Borrowing rate</Text>
                  <Text textStyle="textMono16">{formatPercent(item.borrowRate)}</Text>
                </HStack>

                <HStack justify="space-between">
                  <Text color="black.0">Total borrowed</Text>
                  <Tooltip label="Total borrowed">
                    <Text variant="tooltip" color="white" textStyle="textMono16">
                      {formatNumber(item.borrowed)}
                    </Text>
                  </Tooltip>
                </HStack>
              </>
            );
          case RowCardProccessType.assets:
            return (
              <>
                <Divider borderColor="black.60" />
                <Flex alignItems="center" justifyContent="space-between">
                  <Text fontSize="md" fontWeight="500" color="whiteAlpha.70">
                    My Borrow
                  </Text>
                  <Text textStyle="textMono16">1000</Text>
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
      proccess({ item }) {
        return (
          <>
            <BorrowButton pool={item} />
            <RepayButton pool={item} />
          </>
        );
      }
    }
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3, xl: 4 }} spacing="24px">
      {poolsStore.pools.map((pool: IPoolData) => (
        <CardPool
          key={pool.token}
          itemCard={pool}
          rowCard={rowCard}
          onClick={() => handleLink(pool.rebalancerAddress)}
        />
      ))}
    </SimpleGrid>
  );
});
