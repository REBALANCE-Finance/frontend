import { Button, Divider, Flex, HStack, Link, Text } from "@chakra-ui/react";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAccount } from "wagmi";

import Icon from "../../components/icon";
import { CHAIN_ICONS, ICON_NAMES } from "../../consts";
import { STRATEGIES } from "../../consts/strategies";
import { storesContext } from "../../store/app.store";
import { getFinalExplorerUrl } from "../../utils/url";
import { AssetHeader } from "./components/header/AssetHeader";

const strategies = [
  {
    key: STRATEGIES.based,
    title: "AI-based Rebalance Strategy",
    description: "Lowest risk. Average profit. Single-asset pool."
  },
  {
    key: STRATEGIES.yield,
    title: "AI Yield Strategy (coming soon)",
    description: "Low risk. High profit. Concentrated liquidity."
  }
];

export const LendingAsset = observer(() => {
  const { chain } = useAccount();
  const { poolsStore } = useContext(storesContext);
  const { poolAddress } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    poolsStore.fetchPools("lending");
  }, [poolsStore]);

  const pool = poolsStore.pools.find(item => item.rebalancerAddress === poolAddress);

  const strategic = searchParams.get("strategic") ?? STRATEGIES.based;

  const handleLink = (type: string) => {
    setSearchParams({ strategic: type });
  };

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
                  address: poolAddress,
                  type: "address"
                })}
                isExternal
              >
                <Icon name={ICON_NAMES.link} size="sm" />
              </Link>
            </Flex>
          </Flex>

          <HStack divider={<Divider orientation="vertical" />} h="100%" color="black.5">
            <Link href="" isExternal>
              <Flex align="center" gap="8px">
                Audited pool contracts <Icon name={ICON_NAMES.link} size="18px" />
              </Flex>
            </Link>
            <Link href="" isExternal>
              <Flex align="center" gap="8px">
                How the strategy works <Icon name={ICON_NAMES.link} size="18px" />
              </Flex>
            </Link>
          </HStack>
        </Flex>
      </Flex>

      <Flex gap="10px" align="center">
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
      </Flex>
    </Flex>
  );
});
