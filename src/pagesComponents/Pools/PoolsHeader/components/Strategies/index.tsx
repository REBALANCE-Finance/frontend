import { Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";

import Icon from "../../../../../components/icon";
import { CHAIN_ICONS, ICON_NAMES } from "../../../../../consts";
import { useStore } from "@/hooks/useStoreContext";
import { arbitrum, bsc } from "viem/chains";
import { observer } from "mobx-react-lite";
import { isMobile } from "react-device-detect";

type StrategiesProps = {
  onResetCountDown: VoidFunction;
};

export const Strategies = observer(({ onResetCountDown }: StrategiesProps) => {
  const { chains, switchChain } = useSwitchChain();
  const { chain, address, chainId, connector } = useAccount();
  const { activeChain, setActiveChain, resetPools } = useStore("poolsStore");
  const [activeChainId, setActiveChainId] = useState(
    chainId || (activeChain === "BSC" ? bsc.id : arbitrum.id)
  );
  const isMagicActive = connector?.id === "magic";

  const handleSwitchChain = (id: number) => {
    if (!address || isMagicActive) {
      setActiveChain(id === bsc.id ? "BSC" : "Arbitrum");
    }

    onResetCountDown();
    resetPools();
    switchChain({ chainId: id });
    setActiveChainId(id);
  };

  const getItemName = (name: string) => {
    if (name === "BNB Smart Chain") {
      return "Binance Smart Chain";
    }

    return name;
  };

  const iconName = activeChain === "BSC" ? bsc.id : arbitrum.id;

  return (
    <Menu>
      <MenuButton>
        <Flex alignItems="center" gap={isMobile ? "8px" : "12px"} color="lightGray">
          <Icon name={CHAIN_ICONS[iconName]} />
          {/* <Text fontSize="xl">{CHAIN_NAMES[chain?.id ?? 0]}</Text> */}
          <Text fontSize="medium">Select chain</Text>
          <Icon name={ICON_NAMES.chevronDown} />
        </Flex>
      </MenuButton>

      <MenuList
        zIndex={1000}
        as={Flex}
        direction="column"
        bg="black.60"
        border="none"
        p="24px 12px"
        gap="24px"
      >
        {chains.map(({ id, name }) => (
          <MenuItem
            key={name}
            bg="transparent"
            p="0"
            gap="8px"
            color={activeChainId === id ? "greenAlpha.60" : undefined}
            onClick={() => handleSwitchChain(id)}
          >
            <Icon name={CHAIN_ICONS[id]} />
            <Text>{getItemName(name)}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
});
