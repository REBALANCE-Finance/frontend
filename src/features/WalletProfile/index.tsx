import {
  Circle,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { useAccount, useDisconnect } from "wagmi";

import { JazzIcon } from "../../components/address-icon/JazzIcon";
import { Icon } from "../../components/icon";
import { ICON_NAMES } from "../../consts";
import { ellipsis } from "../../utils";
import { WalletProfileBtn } from "./components/WalletProfileBtn";
import { WalletProfileSettings } from "./components/WalletProfileSettings";
import { WalletProfileTransactionHistory } from "./components/WalletProfileTransactionHistory";

export const WalletProfile = () => {
  const { disconnect } = useDisconnect();
  const { address, connector, isConnected } = useAccount();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const name = connector?.name;

  return (
    <>
      <WalletProfileBtn onOpen={onOpen} address={String(address)} />

      <Drawer isOpen={isOpen} onClose={onClose} placement="right">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="black.0" />
          <DrawerHeader>My Profile</DrawerHeader>

          <DrawerBody as={Flex} gap="24px" direction="column">
            <Flex w="100%" justify="space-between" align="center" h="fit-content">
              <Flex gap="10px" align="center">
                <JazzIcon address={String(address)} size={42} />
                <Flex direction="column" gap="10px">
                  <Text fontWeight="500">{ellipsis(String(address))}</Text>
                  <Flex align="center" gap="6px">
                    <Circle bg={isConnected ? "greenAlpha.100" : "redAlpha.100"} size="6px" />
                    <Text fontSize="xs">Connected to {name}</Text>
                  </Flex>
                </Flex>
              </Flex>
              <IconButton
                aria-label="logout"
                onClick={() => disconnect()}
                icon={<Icon name={ICON_NAMES.logoutSquare} />}
              />
            </Flex>

            <WalletProfileSettings />

            {/* <WalletProfileNotification /> */}

            <WalletProfileTransactionHistory />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
