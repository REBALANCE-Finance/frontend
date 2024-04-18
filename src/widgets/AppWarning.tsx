'use client'

import { CloseButton, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

export const AppWarning = () => {
  const WARNING_BANNER = "open-warning-banner";
  const [isOpenWarn, setOpenWarn] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const localStateWornBanner = localStorage.getItem(WARNING_BANNER);
      setOpenWarn(localStateWornBanner ? JSON.parse(localStateWornBanner) : true);
    }
  },[])

  const handleClose = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(WARNING_BANNER, "false");
    }
    setOpenWarn(false);
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
