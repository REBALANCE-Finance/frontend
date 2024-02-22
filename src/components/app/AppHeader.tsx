import { Flex, Image } from "@chakra-ui/react";
import React from "react";

import Logo from "../../assets/logo/logo-long.svg";
import { ConnectWallet } from "../../feature/ConnectWallet";
import { AppNav } from "./AppNav";

export const AppHeader = () => {
  return (
    <Flex
      alignItems="center"
      p={{ base: "6px 16px", md: "24px 16px", xxl: "24px 0" }}
      justifyContent="space-between"
      maxW={"1360px"}
      w="100%"
    >
      <Image src={Logo} w="150px" />
      <AppNav />
      <ConnectWallet />
    </Flex>
  );
};
