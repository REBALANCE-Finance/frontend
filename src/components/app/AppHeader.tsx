import { Flex, Image, useMediaQuery } from "@chakra-ui/react";
import React from "react";

import LogoDesc from "../../assets/logo/logo-long.svg";
import LogoMob from "../../assets/logo/logo-short.svg";
import { MEDIA_QUERY_MAX } from "../../consts";
import { ConnectWallet } from "../../feature/ConnectWallet";
import { AppNav } from "./AppNav";
import { AppNotification } from "./AppNotification";

export const AppHeader = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  return (
    <Flex
      alignItems="center"
      p={{ base: "6px 16px", md: "24px 16px", xxl: "24px 0" }}
      justifyContent="space-between"
      maxW={"1300px"}
      minH={{ base: "56px", md: "auto" }}
      w="100%"
    >
      <Image src={media ? LogoMob : LogoDesc} w={{ base: "30px", md: "150px" }} />

      {!media && <AppNav />}

      <Flex gap="12px" alignItems="center">
        <AppNotification />
        <ConnectWallet />
        {media && <AppNav />}
      </Flex>
    </Flex>
  );
};
