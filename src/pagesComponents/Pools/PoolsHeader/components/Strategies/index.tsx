import { Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";

import Icon from "../../../../../components/icon";
import { CHAIN_ICONS, ICON_NAMES } from "../../../../../consts";

export const Strategies = () => {
  const { chains, switchChain } = useSwitchChain();
  const { chain } = useAccount();
  const [isActiveChain, setIsActiveChain] = useState(chains[0].id === chain?.id);

  const handleSwitchChain = (id: number) => {
    switchChain({ chainId: id });
    setIsActiveChain(chains[0].id === id);
  };
  return (
    <Menu>
      <MenuButton>
        <Flex alignItems="center" gap="12px" color="lightGray">
          <Icon name={CHAIN_ICONS[chain?.id ?? 42161]} />
          {/* <Text fontSize="xl">{CHAIN_NAMES[chain?.id ?? 0]}</Text> */}
          <Text fontSize="medium">Arbitrum</Text>
          <Icon name={ICON_NAMES.chevronDown} />
        </Flex>
      </MenuButton>

      <MenuList zIndex={1000} as={Flex} direction="column" bg="black.60" border="none" p="24px 12px" gap="24px">
        <Text fontSize="sm">Select the Market</Text>

        {chains.map(({ id, name }) => {
          if (id === 42161) {
            return (
              <MenuItem
                key={name}
                bg="transparent"
                p="0"
                gap="8px"
                color={isActiveChain ? "greenAlpha.60" : undefined}
                onClick={() => handleSwitchChain(id)}
              >
                <Icon name={CHAIN_ICONS[id]} />
                <Text>{name}</Text>
              </MenuItem>
            );
          }
          return (
            <MenuItem
              key={name}
              bg="transparent"
              p="0"
              gap="8px"
              onClick={() => handleSwitchChain(id)}
              isDisabled
            >
              <Icon name={CHAIN_ICONS[id]} />
              <Text>{name}</Text>
              <Text
                fontSize="xs"
                p="0 4px"
                bg="greenAlpha.10"
                color="greenAlpha.80"
                borderRadius="50px"
              >
                Coming soon
              </Text>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
