import { Flex, Image } from "@chakra-ui/react";
import React from "react";

import Logo from "../../assets/logo/logo-long.svg";
import { ConnectWallet } from "../../feature/ConnectWallet";
import { AppNav } from "./AppNav";
import { AppNotification } from "./AppNotification";

export const AppHeader = () => {
  return (
    <Flex
      alignItems="center"
      p={{ base: "6px 16px", md: "24px 16px", xxl: "24px 0" }}
      justifyContent="space-between"
      maxW={"1300px"}
      w="100%"
    >
      <Image src={Logo} w="150px" />

      <AppNav />

      <Flex gap="12px" alignItems="center">
        <AppNotification />
        <ConnectWallet />
      </Flex>
    </Flex>
  );
};
