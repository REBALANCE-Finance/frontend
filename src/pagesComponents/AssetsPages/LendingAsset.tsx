'use client';

import { Divider, Flex, HStack, Link, Text, useMediaQuery, Box, Skeleton } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import { useParams, useSearchParams } from 'next/navigation';
import { useAccount } from "wagmi";
import Icon from "../../components/icon";
import { CHAIN_ICONS, ICON_NAMES, MEDIA_QUERY_MAX } from "../../consts";
import { STRATEGIES } from "../../consts/strategies";
import BaseStrategy from "../../features/RebalanceStrategy/BaseStrategy";
import { getFinalExplorerUrl } from "../../utils/url";
import { AssetHeader } from "./components/header/AssetHeader";
import { IPoolData, IAreaChartData } from "@/api/pools/types";

export const LendingAsset = observer(({ pools, chartData, loading, error }: {
  pools: IPoolData[],
  chartData: IAreaChartData | null,
  loading: boolean,
  error: string | null
}) => {
  const { chain } = useAccount();
  const { poolAddress } = useParams();
  const finalAddress = Array.isArray(poolAddress) ? poolAddress[0] : poolAddress;
  const searchParams = useSearchParams();
  const pool = pools.find(item => item.rebalancerAddress === poolAddress);
  const strategic = searchParams.get("strategic") ?? STRATEGIES.based;

  const [media] = useMediaQuery(MEDIA_QUERY_MAX);

  const renderSkeleton = (height: string, width?: string) => (
    <Skeleton height={height} width={width || "100%"} />
  );

  return (
    <Flex h="100%" w="100%" direction="column" gap="24px">
      {loading || error ? (
        <>
          {renderSkeleton("40px")}
          {renderSkeleton("20px", "150px")}
          {renderSkeleton("20px", "100px")}
        </>
      ) : (
        <AssetHeader pool={pool} />
      )}
      <Flex direction="column">
        <Flex align="center" justify="space-between">
          {
            !media &&
            <Flex gap="8px">
            <Text fontWeight="500">{loading || error ? renderSkeleton("20px", "60px") : "Pool"}</Text>
            <Flex align="center" gap="5px">
              {loading || error ? (
                <>
                  {renderSkeleton("18px", "18px")}
                  {renderSkeleton("20px", "100px")}
                </>
              ) : (
                <>
                  <Icon name={CHAIN_ICONS[chain?.id ?? 0]} size="18px" />
                  <Link
                    href={getFinalExplorerUrl({
                      url: "https://arbiscan.io",
                      address: finalAddress,
                      type: "address"
                    })}
                    display="flex"
                    justifyContent={"space-between"}
                    isExternal
                  >
                    <Text textStyle="text14" color="black.5" mr="6px">
                      {poolAddress}
                    </Text>
                    <Icon name={ICON_NAMES.link} size="sm" />
                  </Link>
                </>
              )}
            </Flex>
          </Flex>
          }

          <HStack divider={<Divider orientation="vertical" />} h="100%" color="black.5">
            {loading || error ? renderSkeleton("20px", "100px") : (
              <Link
                href="https://rebalance.gitbook.io/rebalance/yield-optimization-and-lp/lending-rebalance-strategy#mechanism-behind-the-rebalancer"
                isExternal
              >
                <Flex align="center" gap="8px">
                  How the strategy works <Icon name={ICON_NAMES.link} size="18px" />
                </Flex>
              </Link>
            )}
          </HStack>
        </Flex>
      </Flex>
      <Flex direction="column">
        {strategic === STRATEGIES.based ? (
          loading || error ? (
            renderSkeleton("200px")
          ) : (
            <BaseStrategy pool={pool} chartData={chartData} />
          )
        ) : null}
      </Flex>
    </Flex>
  );
});
