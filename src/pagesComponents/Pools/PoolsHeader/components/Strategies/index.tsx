import { Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";

import Icon from "../../../../../components/icon";
import { CHAIN_ICONS, ICON_NAMES } from "../../../../../consts";

export const Strategies = () => {
  const { chains, switchChain } = useSwitchChain();
  const { chain } = useAccount();
  const [activeChainId, setActiveChainId] = useState(chain?.id || chains[0].id);

  const handleSwitchChain = (id: number) => {
    switchChain({ chainId: id });
    setActiveChainId(id);
  };

  const getActiveChainName = () => {
    if (chain?.name === "BNB Smart Chain") {
      return "BSC";
    }

    return "Arbitrum";
  };

  return (
    <Menu>
      <MenuButton>
        <Flex alignItems="center" gap="12px" color="lightGray">
          <Icon name={CHAIN_ICONS[chain?.id ?? 42161]} />
          {/* <Text fontSize="xl">{CHAIN_NAMES[chain?.id ?? 0]}</Text> */}
          <Text fontSize="medium">{getActiveChainName()}</Text>
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
        <Text fontSize="sm">Select the Market</Text>

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
            <Text>{name}</Text>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
