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
import { useRouter } from "next/navigation";
import { useStore } from "@/hooks/useStoreContext";
import { getIdByToken } from "@/utils/analytics";
import { observer } from "mobx-react-lite";

const YieldPoolList = ({ pools }: { pools: string[] }) => (
  <>
    {pools.map((pool, index) => (
      <span key={index}>
        <br />- {pool}
      </span>
    ))}
  </>
);

export const PoolsLending = observer(
  ({ pools, loading, error }: { pools: IPoolData[]; loading: boolean; error: string | null }) => {
    const { address } = useAccount();
    const router = useRouter();
    const poolStore = useStore("poolStore");
    const { activeChain } = useStore("poolsStore");

    const getChainRouteName = () => {
      return activeChain === "BSC" ? "bsc" : "arb";
    };

    const handleCardClick = (event: any, pool: IPoolData) => {
      if ((event.target as HTMLElement).closest("button")) {
        return;
      }
      poolStore.setActivePool(pool);
      router.push(ROUTE_PATHS.lendingAssetPage(getChainRouteName(), pool.token), { scroll: false });
    };

    const getYieldStrategy = (token: string) => {
      const baseMessage = `${token} Low-Risk Yield Strategy: Higher APY is achieved by automatic rebalance between the following pools:`;

      const defaultPools = ["Compound V3", "Aave V3"];

      let pools: string[];

      if (token === "DAI") {
        pools = [defaultPools[1]];
      } else if (token === "FRAX") {
        pools = ["Fraxlend", defaultPools[1]];
      } else {
        pools = defaultPools;
      }

      return (
        <>
          <span>{baseMessage}</span>
          <YieldPoolList pools={pools} />
        </>
      );
    };

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
                    <Tooltip label={getYieldStrategy(item.token)}>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        w="100%"
                        alignItems="center"
                      >
                        <Text color="white" borderBottom={"dashed 1px gray"}>
                          APY
                        </Text>
                        {activeChain === "Arbitrum" && (
                          <Box ml="auto" display="flex">
                            {(item.token === "USDT" ||
                              item.token === "wETH" ||
                              item.token === "USDC" ||
                              item.token === "USDC.e") && (
                              <Box borderRadius="50%" mr="-4px" zIndex={3}>
                                <Icon name="COMPOUND" width="14px" height="14px" />
                              </Box>
                            )}

                            {item.token === "FRAX" && (
                              <Box borderRadius="50%" mr="-4px" zIndex={2}>
                                <Icon name="FRAXLEND" width="14px" height="14px" />
                              </Box>
                            )}

                            <Icon name="AAVE" width="10px" height="10px" />
                          </Box>
                        )}
                        {activeChain === "BSC" && (
                          <Box ml="auto" display="flex">
                            <Box mr="-4px" zIndex={3}>
                              <Icon name="AAVE" width="10px" height="10px" />
                            </Box>
                            <Box mr="-4px" zIndex={2}>
                              <Icon name="KINZA" width="14px" height="14px" />
                            </Box>
                          </Box>
                        )}
                        <Text textStyle="textMono16" ml={2}>
                          {loading || error ? (
                            <Skeleton height="20px" width="50px" />
                          ) : (
                            formatNeutralPercent(item.avgApr)
                          )}
                        </Text>
                        {item.token === "FRAX" && (
                          <Text textStyle="textMono16" ml={2} color="green.100">
                            +20% ARB
                          </Text>
                        )}
                      </Box>
                    </Tooltip>
                  </HStack>

                  <HStack justify="space-between">
                    <Tooltip label="Rebalance APY  advantage over the lending market highest APY in last 30 days">
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
              <DepositLendingButton
                pool={item}
                minHeight="40px"
                id={
                  address
                    ? `Click_Deposit_${getIdByToken(item.token)}`
                    : `Click_Deposit_start_${getIdByToken(item.token)}`
                }
              />
              <WithdrawLendingButton pool={item} minHeight="40px" />
            </>
          );
        }
      }
    ];

    return (
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        spacing="24px"
        alignItems="center"
        id="pools"
      >
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
              <Box
                key={elem.token}
                onClick={event => handleCardClick(event, elem)}
                cursor="pointer"
              >
                <CardPool key={elem.token} rowCard={rowCard} itemCard={elem} />
              </Box>
            ))}
      </SimpleGrid>
    );
  }
);
