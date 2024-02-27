import { IconButton, Menu as ChakraMenu, MenuButton, MenuList } from "@chakra-ui/react";
import React from "react";

import { Icon } from "../../../../../components/icon";
import { ICON_NAMES } from "../../../../../consts";

export const Menu = () => {
  return (
    <ChakraMenu>
      <MenuButton as={IconButton} h="fit-content" icon={<Icon name={ICON_NAMES.menu} />} />
      <MenuList></MenuList>
    </ChakraMenu>
  );
};
