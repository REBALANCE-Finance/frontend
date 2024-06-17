'use client'

import { Flex, Link, Image, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useAccount } from "wagmi";

import LogoDesc from "/public/assets/logo/logo-long.svg";
import LogoMob from "/public/assets/logo/logo-short.svg";
import { MEDIA_QUERY_MAX } from "../consts";
import { ConnectWallet } from "../features/ConnectWallet";
import { WalletProfile } from "../features/WalletProfile";
import { AppNav } from "./AppNav";
import { AppNotification } from "./AppNotification";

export const AppHeader = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  const { isConnected } = useAccount();

  return (
    <Flex
      alignItems="center"
      p={{ base: "6px 16px", xl: "24px 0px" }}
      justifyContent="space-between"
      maxW={"1300px"}
      minH={{ base: "56px", md: "auto" }}
      w="100%"
      position="sticky"
      top="0"
      zIndex={100}
      bg="black.100"
    >
      <Link as={NextLink} href="/lending">
        <Image src={media ? LogoMob.src : LogoDesc.src} w={{ base: "30px", md: "150px" }} />
      </Link>

      {!media && <AppNav />}

      <Flex gap="12px" alignItems="center">
        {/* {isConnected && <AppNotification />} */}
        {isConnected ? <WalletProfile /> : <ConnectWallet />}
        {media && <AppNav />}
      </Flex>
    </Flex>
  );
};
