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
import { storesContext } from "../../../store/app.store";
import { formatNumber, formatPercent } from "../../../utils/formatNumber";
import { IRowCard, RowCardNames, RowCardProccessType } from "../types";
import DepositInfo from "./components/DepositInfo";

export const PoolsLending = observer(() => {
  const { poolsStore } = useContext(storesContext);
  const navigate = useNavigate();
  const { address } = useAccount();
  useEffect(() => {
    poolsStore.fetchPools("lending");
  }, [poolsStore]);

  const handleLink = (poolAddress: string) => {
    navigate(generatePath(ROUTE_PATHS.lendingAsset, { poolAddress }));
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
                  <Tooltip label="Funds in pool">
                    <Text variant="tooltip" textStyle="textMono16" color="white">
                      {formatNumber(item.funds)}
                    </Text>
                  </Tooltip>
                </HStack>

                <HStack justify="space-between">
                  <Text color="white">Profit Earned</Text>
                  <Text textStyle="textMono16">{formatNumber(item.earned)}</Text>
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
                {!!address && item.token == "usdt" ? (
                  <>
                    <Divider borderColor="black.60" />
                    <DepositInfo contractAddress={item.rebalancerAddress} ownerAddress={address} />
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
            {!!item.deposit && <WithdrawLendingButton pool={item} />}
          </>
        );
      }
    }
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 3, xl: 4 }} spacing="24px">
      {poolsStore.pools.map(elem => (
        <CardPool
          key={elem.token}
          rowCard={rowCard}
          itemCard={elem}
          onClick={() => elem.token == "usdt" && handleLink(elem.rebalancerAddress)}
        />
      ))}
    </SimpleGrid>
  );
});
