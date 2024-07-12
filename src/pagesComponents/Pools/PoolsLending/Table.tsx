"use client";

import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  Text,
  Skeleton,
  useMediaQuery
} from "@chakra-ui/react";
import { IPoolData } from "../types";
import { Risk } from "@/components/risk";
import { TokenIcon } from "@/components/token-icon";
import { formatNumber } from "@/utils/formatNumber";
import DepositInfo from "./components/DepositInfo";
import { useAccount } from "wagmi";
import UserProfitPool from "./components/UserProfitPool";
import { DepositLendingButton } from "@/features/actions/deposit-or-withdraw-button/DepositLendingButton";
import { WithdrawLendingButton } from "@/features/actions/deposit-or-withdraw-button/WithdrawLendingButton";
import { generatePath } from "react-router-dom";
import { ROUTE_PATHS } from "@/consts/routes";
import { useRouter } from "next/navigation";

interface PoolsLendingTableProps {
  pools: IPoolData[];
  isLoading: boolean;
  error?: string | null;
}

const PoolsLendingTable = ({ pools, isLoading, error }: PoolsLendingTableProps) => {
  const { address } = useAccount();
  const router = useRouter();
  const [isNotDesktop] = useMediaQuery("(max-width: 1024px)");

  const handleLink = (poolToken: string) => {
    router.push(generatePath(ROUTE_PATHS.lendingAsset, { poolToken }));
  };

  if (isLoading || error) {
    return (
      <Flex flexDir="column" gap={1}>
        <Skeleton height="65px" />
        <Skeleton height="90px" />
        <Skeleton height="90px" />
        <Skeleton height="90px" />
      </Flex>
    );
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr color="white">
            <Th maxW="136px" p="16px 12px 16px 32px" textTransform="unset">
              <Text textStyle="text14">Asset name</Text>
            </Th>
            <Th maxW="118px" p="16px 12px">
              <Text textStyle="text14" textTransform="capitalize">
                Risk factor
              </Text>
            </Th>
            <Th maxW="118px" p="16px 12px" textTransform="unset">
              <Text textStyle="text14">Funds in pool</Text>
            </Th>
            <Th maxW="118px" p="16px 12px">
              <Text textStyle="text14" textTransform="capitalize">
                Profit Earned
              </Text>
            </Th>
            <Th maxW="118px" p="16px 12px" textTransform="unset">
              <Text textStyle="text14">30D avg. APR</Text>
            </Th>
            <Th maxW="118px" p="16px 12px" textTransform="unset">
              <Text
                textStyle="text14"
                sx={{
                  textWrap: "balance"
                }}
              >
                GLIA APR {">"} market avg.
              </Text>
            </Th>
            <Th maxW="118px" p="16px 12px" textTransform="unset">
              <Text textStyle="text14">My deposit</Text>
            </Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pools.map(pool => (
            <Tr
              key={pool.tokenAddress}
              onClick={() => handleLink(pool.token)}
              cursor="pointer"
              transition="all .3s"
              _hover={{
                bg: "black.80"
              }}
            >
              <Th p="24px 12px 24px 32px">
                <Flex gap={1.5} alignItems="center">
                  <TokenIcon name={pool.token} size="34px" sizeIcon="18px" />
                  <Text textStyle="h2" fontWeight={500} color="white">
                    {pool.token}
                  </Text>
                </Flex>
              </Th>
              <Th p="24px 12px">
                <Risk risk={pool.risk} />
              </Th>
              <Th p="24px 12px">
                <Text
                  textStyle="textMono16"
                  color="white"
                  borderBottom="1px dashed white"
                  w="max-content"
                >
                  {formatNumber(pool.funds)}
                </Text>
              </Th>
              <Th p="24px 12px">
                <Text textStyle="textMono16" color="white">
                  {address && <UserProfitPool address={address} token={pool.token} noSymbol />}
                </Text>
              </Th>
              <Th p="24px 12px">
                <Text textStyle="textMono16" color="white">
                  {formatNumber(pool.avgApr)}%
                </Text>
              </Th>
              <Th p="24px 12px">
                <Text
                  textStyle="textMono16"
                  color={pool.avgApr > 0 ? "greenAlpha.100" : "redAlpha.100"}
                >
                  {pool.avgApr > 0 ? "+" : "-"}
                  {formatNumber(pool.apr)}%
                </Text>
              </Th>
              <Th p="24px 12px">
                {address && (
                  <DepositInfo
                    contractAddress={pool.rebalancerAddress as `0x${string}`}
                    ownerAddress={address}
                    tokenName={pool?.token}
                    decimals={pool.decimals}
                    noTitle
                    noSymbol
                    TextProps={{
                      color: "white"
                    }}
                  />
                )}
              </Th>
              <Th minW="200px" p="24px 32px 24px 12px" display="flex" gap={2}>
                <DepositLendingButton
                  pool={pool}
                  ButtonProps={{
                    flex: 1
                  }}
                />
                <WithdrawLendingButton
                  pool={pool}
                  ButtonProps={{
                    flex: 1
                  }}
                />
              </Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default PoolsLendingTable;
