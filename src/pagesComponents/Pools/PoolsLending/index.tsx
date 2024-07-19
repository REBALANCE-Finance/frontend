"use client";

import { Box, Divider, Flex, HStack, SimpleGrid, Text, Skeleton } from "@chakra-ui/react";
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
import UserProfitPool from "./components/UserProfitPool";
import Icon from "@/components/icon";
import Link from "next/link";

export const PoolsLending = ({
  pools,
  loading,
  error
}: {
  pools: IPoolData[];
  loading: boolean;
  error: string | null;
}) => {
  const { address } = useAccount();

  const rowCard: IRowCard[] = [
    {
      name: RowCardNames.header,
      proccess({ item }) {
        return (
          <Flex direction="column" alignItems="center">
            <Tooltip
              label={
                <span>
                  Asset risk - 1<br />
                  Protocols risk - 1
                </span>
              }
              color="white"
            >
              <Text textStyle="textMono12" letterSpacing="3px" color="gray.100">
                RISK
              </Text>
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
                      {loading || error ? (
                        <Skeleton height="20px" width="50px" />
                      ) : (
                        formatNumber(item.funds) + " $"
                      )}
                    </Text>
                  </Tooltip>
                </HStack>
                <Divider borderColor="black.60" />
                <HStack>
                  <Tooltip
                    label={
                      <>
                        <span>
                          {item.token} Low-Risk Yield Strategy Higher APR is achieved by automatic
                          rebalance between following pools:
                        </span>
                        {(item.token === "wETH" || item.token === "USDC.e") && (
                          <span>
                            <br />- Silo
                          </span>
                        )}
                        <span>
                          <br />- Dolomite
                        </span>
                        <span>
                          <br />- AAVE v3
                        </span>
                        <span>
                          <br />- Compound
                        </span>
                        <span>
                          <br />- Radiant v2
                        </span>
                      </>
                    }
                  >
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      w="100%"
                      alignItems="center"
                      className={item.token === "USDT" ? "step-3" : ""}
                    >
                      <Text color="white" borderBottom={"dashed 1px gray"}>
                        APR
                      </Text>
                      <Box ml="auto" display="flex">
                        {(item.token === "wETH" || item.token === "USDC.e") && (
                          <Box borderRadius="50%" mr="-4px" zIndex={5}>
                            <Icon name="SILO" width="14px" height="14px" />
                          </Box>
                        )}
                        <Box borderRadius="50%" zIndex={4} mr="-4px">
                          <Icon name="DOLOMITE" width="14px" height="14px" />
                        </Box>
                        <Box mr="-4px" zIndex={3}>
                          <Icon name="AAVE" width="10px" height="10px" />
                        </Box>
                        {item.token !== "FRAX" ? (
                          <Box mr="-4px" zIndex={2}>
                            <Icon name="RADIANT" width="14px" height="14px" />
                          </Box>
                        ) : null}
                        <Icon name="COMPOUND" width="14px" height="14px" />
                      </Box>
                      <Text textStyle="textMono16">
                        {loading || error ? (
                          <Skeleton height="20px" width="50px" />
                        ) : (
                          formatNeutralPercent(item.avgApr)
                        )}
                      </Text>
                    </Box>
                  </Tooltip>
                </HStack>

                <HStack justify="space-between">
                  <Tooltip label="Rebalance APR  advantage over the lending market highest APR in last 30 days">
                    <Text borderBottom={"dashed 1px gray"} color="white">
                      {">"} market max.
                    </Text>
                  </Tooltip>
                  <Text color={item.apr > 0 ? "green.100" : "white"} textStyle="textMono16">
                    {loading || error ? (
                      <Skeleton height="20px" width="50px" />
                    ) : (
                      formatPercent(item.apr)
                    )}
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
                    <HStack justify="space-between">
                      <Text color="white">My Profit</Text>
                      <Text textStyle="textMono16">
                        {loading || error ? (
                          <Skeleton height="20px" width="50px" />
                        ) : address ? (
                          <UserProfitPool address={address} token={item.token} />
                        ) : (
                          "0.00"
                        )}
                      </Text>
                    </HStack>
                    <DepositInfo
                      contractAddress={item.rebalancerAddress}
                      ownerAddress={address}
                      tokenName={item?.token}
                      decimals={item.decimals}
                    />
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
            <DepositLendingButton pool={item} minHeight="40px" />
            <WithdrawLendingButton pool={item} minHeight="40px" />
          </>
        );
      }
    }
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing="24px" alignItems="center">
      {loading || error
        ? Array.from({ length: 4 }).map((_, index) => (
            <Box key={index} padding="6" bg="#151619">
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Skeleton height="60px" mb="4" w="60px" borderRadius="100px" />
                <Skeleton height="20px" mb="4" w="60px" />
              </Box>
              <Skeleton height="20px" mb="4" />
              <Skeleton height="20px" mb="4" />
              <Skeleton height="20px" mb="4" />
              <Skeleton height="20px" m="0 auto" />
            </Box>
          ))
        : pools?.map(elem => (
            <Link key={elem.token} href={ROUTE_PATHS.lendingAssetPage(elem.token)} passHref>
              <CardPool key={elem.token} rowCard={rowCard} itemCard={elem} />
            </Link>
          ))}
    </SimpleGrid>
  );
};
