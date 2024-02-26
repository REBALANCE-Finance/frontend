import { Flex, Menu, MenuButton, MenuItem, MenuList, Text } from "@chakra-ui/react";
import React from "react";

import { Icon } from "../../../../../components/common/icon";
import { ICON_NAMES } from "../../../../../consts";

export const Strategies = () => {
  return (
    <Menu>
      <MenuButton>
        <Flex alignItems="center" gap="12px" color="lightGray">
          <Icon name={ICON_NAMES.arbitrum} />
          <Text fontSize="xl">Arbitrum Yield Strategies</Text>
          <Icon name={ICON_NAMES.arrowDown} />
        </Flex>
      </MenuButton>

      <MenuList bg="black.70" border="none">
        <MenuItem bg="transparent">Download</MenuItem>
      </MenuList>
    </Menu>
  );
};
