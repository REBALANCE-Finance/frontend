'use client'

import { CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const WARNING_BANNER = "open-warning-banner";
const localStateWornBanner = typeof window !== 'undefined' ? localStorage.getItem(WARNING_BANNER) : null;;
const InfoText = process.env.VITE_WARNING_TEXT;
const isWarningBannerOpen = localStateWornBanner ? JSON.parse(localStateWornBanner) : true;

export const AppWarning = () => {

  const [isOpenWarn, setOpenWarn] = useState(isWarningBannerOpen);
  
  const handleClose = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(WARNING_BANNER, "false");
      setOpenWarn(false);
    }
  };
  return (
    <Flex
      display={isOpenWarn ? "flex" : "none"}
      bg="yellow"
      color="black"
      p="10px 40px"
      w="100%"
      justify="center"
      maxW={"1300px"}
      position="relative"
      mb="20px"
    >
      <Text>{InfoText ?? "Info"}</Text>

      <Flex
        position="absolute"
        bottom="0"
        right="0"
        top="0"
        justifyContent="center"
        alignItems="center"
      >
        <CloseButton size="lg" onClick={handleClose} />
      </Flex>
    </Flex>
  );
};
