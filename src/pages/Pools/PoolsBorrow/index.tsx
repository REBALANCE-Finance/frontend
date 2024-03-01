import { Divider, Flex, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { generatePath, useNavigate } from "react-router-dom";

import { mockData } from "../../../api/pools/queries";
import { CardPool } from "../../../components/card";
import { Tooltip } from "../../../components/tooltip";
import { ROUTE_PATHS } from "../../../consts";
import { BorrowButton } from "../../../features/actions/borrow-or-repay-button/BorrowButton";
import { RepayButton } from "../../../features/actions/borrow-or-repay-button/RepayButton";
import { formatNumber, formatPercent } from "../../../utils/formatNumber";
import { IRowCard, RowCardNames, RowCardProccessType } from "../types";

export const PoolsBorrow = () => {
  const navigate = useNavigate();

  const handleLink = (poolAddress: string) => {
    navigate(generatePath(ROUTE_PATHS.borrowingAsset, { poolAddress }));
  };

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
    <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing="24px">
      {mockData.map(elem => (
        <CardPool
          key={elem.token}
          rowCard={rowCard}
          itemCard={elem}
          onClick={() => handleLink(elem.rebalancerAddress)}
        />
      ))}
    </SimpleGrid>
  );
};
