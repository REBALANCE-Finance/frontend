import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";

import Icon from "../../../../components/icon";
import { ICON_NAMES } from "../../../../consts";

export const WalletProfileSettings = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Flex as={Button} align="center" gap="4px" onClick={onOpen}>
        <Icon name={ICON_NAMES.settings} />
        <Text>Settings</Text>
      </Flex>

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader as={Flex} align="center">
            <Icon
              style={{cursor: "pointer"}}
              aria-label="back"
              name={ICON_NAMES.close}
              size="36px"
              onClick={onClose}
            />
            <Text>Setting</Text>
          </DrawerHeader>
          <DrawerBody></DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
