'use client'

import { Divider, Flex, HStack, Link, Text, useMediaQuery } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useParams, useSearchParams } from 'next/navigation'
import { useAccount } from "wagmi";

import Icon from "../../components/icon";
import { CHAIN_ICONS, ICON_NAMES, MEDIA_QUERY_MAX } from "../../consts";
import { STRATEGIES } from "../../consts/strategies";
import BaseStrategy from "../../features/RebalanceStrategy/BaseStrategy";
import { getFinalExplorerUrl } from "../../utils/url";
import { AssetHeader } from "./components/header/AssetHeader";
import { IPoolData } from "../Pools/types";
import { IAreaChartData } from "@/api/pools/types";

// const strategies = [
//   {
//     key: STRATEGIES.based,
//     title: "AI-based Rebalance Strategy",
//     description: "Lowest risk. Average profit. Single-asset pool."
//   },
//   {
//     key: STRATEGIES.yield,
//     title: "AI Yield Strategy (coming soon)",
//     description: "Low risk. High profit. Concentrated liquidity."
//   }
// ];

export const LendingAsset = observer(({ pools, chartData } : {
  pools: IPoolData[],
  chartData: IAreaChartData
}) => {
  const { chain } = useAccount();
  const { poolAddress } = useParams();
  const finalAddress = Array.isArray(poolAddress) ? poolAddress[0] : poolAddress;
  const searchParams = useSearchParams();
  console.log('searchParams', pools)
  const pool = pools.find(item => item.rebalancerAddress === poolAddress);
  const strategic = searchParams.get("strategic") ?? STRATEGIES.based;

  // const handleLink = (type: string) => {
  //   setSearchParams({ strategic: type });
  // };

  const [media] = useMediaQuery(MEDIA_QUERY_MAX);

  if (!pool) return;

  if (media) {
    return (
      <Flex h="100%" w="100%" direction="column" gap="24px">
        <AssetHeader pool={pool} />
        <Flex direction="column">
          <Flex flexDirection="column">
            {/* <Flex gap="8px">
              <Text fontWeight="500">Pool</Text>
              <Flex gap="5px">
                <Icon name={CHAIN_ICONS[chain?.id ?? 0]} size="18px" />
                <Text textStyle="text14" color="black.5">
                  {poolAddress?.substring(0, 12) +
                    "..." +
                    poolAddress?.substring(poolAddress?.length - 5)}
                </Text>
                <Link
                  href={getFinalExplorerUrl({
                    url: chain?.blockExplorers?.default.url,
                    address: poolAddress,
                    type: "address"
                  })}
                  isExternal
                >
                  <Icon name={ICON_NAMES.link} size="sm" />
                </Link>
              </Flex>
            </Flex> */}
            <HStack divider={<Divider orientation="vertical" />} h="100%" color="black.5">
              {/* <Link href="" isExternal>
                <Flex align="center">
                  Audited pool contracts <Icon name={ICON_NAMES.link} size="18px" />
                </Flex>
              </Link> */}
              <Link
                href="https://rebalance.gitbook.io/rebalance/yield-optimization-and-lp/lending-rebalance-strategy#mechanism-behind-the-rebalancer"
                isExternal
              >
                <Flex align="center">
                  How the strategy works <Icon name={ICON_NAMES.link} size="18px" />
                </Flex>
              </Link>
            </HStack>
          </Flex>
        </Flex>
        {/* <Flex gap="2px">
          {strategies.map(({ key }) => {
            const isActive = key === strategic;
            return (
              <Flex
                key={key}
                border="1px"
                p="8px"
                borderRadius="3px"
                borderColor={isActive ? "#4CFF94" : "#09090B"}
                h="100%"
                opacity={isActive ? 1 : 0.6}
                onClick={() => handleLink(key)}
                alignItems="center"
                justifyContent="center"
              >
                <Text fontWeight="500 !important" textAlign="center" fontSize="14px">
                  {key == "based"
                    ? "Lending Rebalance Strategy"
                    : "Combined yield strategy (coming soon)"}
                </Text>
              </Flex>
            );
          })}
          <Flex as={Button} align="center" justify="center" color="greenAlpha.80" h="100%">
            <Icon name={ICON_NAMES.add} />
          </Flex>
        </Flex> */}
        <Flex direction="column">
          {strategic === STRATEGIES.based && <BaseStrategy pool={pool} chartData={chartData}/>}
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex h="100%" w="100%" direction="column" gap="24px">
      <AssetHeader pool={pool} />
      <Flex direction="column">
        <Flex align="center" justify="space-between">
          <Flex gap="8px">
            <Text fontWeight="500">Pool</Text>
            <Flex align="center" gap="5px">
              <Icon name={CHAIN_ICONS[chain?.id ?? 0]} size="18px" />
              <Text textStyle="text14" color="black.5">
                {poolAddress}
              </Text>
              <Link
                href={getFinalExplorerUrl({
                  url: chain?.blockExplorers?.default.url,
                  address: finalAddress,
                  type: "address"
                })}
                isExternal
              >
                <Icon name={ICON_NAMES.link} size="sm" />
              </Link>
            </Flex>
          </Flex>

          <HStack divider={<Divider orientation="vertical" />} h="100%" color="black.5">
            {/* <Link href="" isExternal>
              <Flex align="center" gap="8px">
                Audited pool contracts <Icon name={ICON_NAMES.link} size="18px" />
              </Flex>
            </Link> */}
            <Link
              href="https://rebalance.gitbook.io/rebalance/yield-optimization-and-lp/lending-rebalance-strategy#mechanism-behind-the-rebalancer"
              isExternal
            >
              <Flex align="center" gap="8px">
                How the strategy works <Icon name={ICON_NAMES.link} size="18px" />
              </Flex>
            </Link>
          </HStack>
        </Flex>
      </Flex>

      {/* <Flex gap="10px" align="center">
        {strategies.map(({ key, title, description }) => {
          const isActive = key === strategic;
          return (
            <Flex
              as={Button}
              key={key}
              direction="column"
              align="center"
              justify="center"
              bg={isActive ? "black.40" : "black.70"}
              p="14px 24px"
              borderRadius="12px 12px 0px 0px"
              h="100%"
              opacity={isActive ? 1 : 0.6}
              onClick={() => handleLink(key)}
            >
              <Text fontWeight="500">{title}</Text>
              <Text textStyle="text14" color="#D2D2D2">
                {description}
              </Text>
            </Flex>
          );
        })}

        <Flex
          as={Button}
          align="center"
          justify="center"
          border="2px solid"
          borderColor="black.70"
          p="14px 24px"
          borderRadius="12px 12px 0px 0px"
          color="greenAlpha.80"
          gap="8px"
          h="100%"
        >
          <Icon name={ICON_NAMES.add} /> <Text>Add Your Strategy</Text>
        </Flex>
      </Flex> */}
      <Flex direction="column">
        {strategic === STRATEGIES.based && <BaseStrategy pool={pool} chartData={chartData}/>}
      </Flex>
    </Flex>
  );
});
