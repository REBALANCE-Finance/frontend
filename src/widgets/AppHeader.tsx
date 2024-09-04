"use client";

import {
  Flex,
  Link,
  Image,
  useMediaQuery,
  Text,
  Skeleton,
  useOutsideClick,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button
} from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import NextLink from "next/link";
import { useAccount } from "wagmi";
import LogoDesc from "/public/assets/logo/logo-long.svg";
import LogoMob from "/public/assets/logo/logo-short.svg";
import { MEDIA_QUERY_MAX, ROUTE_PATHS, TELEGRAM_FOLLOW_LINK, TWITTER_FOLLOW_URL } from "../consts";
import { ConnectWallet } from "../features/ConnectWallet";
import { WalletProfile } from "../features/WalletProfile";
import { AppNav } from "./AppNav";
import MaintenanceBlock from "@/components/maintenance-block";
import { getEarnedPoints, getTasks } from "@/api/points/queries";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import UserTasksPopover from "@/components/popover/UserTasksPopover";

export const AppHeader = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  const { isConnected, address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const isUnderMaintenance = process.env.NEXT_PUBLIC_IS_UNDER_MAINTENANCE === "true";
  const [isDesktop] = useMediaQuery("(min-width: 1130px)");

  return (
    <Flex
      flexDir="column"
      w="100%"
      maxW={"1300px"}
      position="sticky"
      top={0}
      zIndex={100}
      bg="black.100"
      minH={isUnderMaintenance ? { base: "120px", md: "160px" } : { base: "56px", md: "56px" }}
    >
      {isUnderMaintenance && <MaintenanceBlock />}
      <Flex
        alignItems="center"
        p={{ base: "6px 16px", xl: "24px 0px" }}
        justifyContent="space-between"
        w="100%"
      >
        <Link as={NextLink} href={ROUTE_PATHS.lending}>
          <Image
            src={media ? LogoMob.src : LogoDesc.src}
            w={{ base: "30px", lg: media ? "30px" : "150px" }}
          />
        </Link>

        {!media && <AppNav />}

        <Flex gap="12px" alignItems="center">
          {address && isDesktop && !isLoading && <UserTasksPopover address={address} />}
          {!!address && isDesktop && isLoading && <Skeleton height="24px" width="60px" />}
          {/* {isConnected && <AppNotification />} */}
          {!!address ? <WalletProfile className="step-1" /> : <ConnectWallet className="step-1" />}
          {media && <AppNav />}
        </Flex>
      </Flex>
    </Flex>
  );
};
