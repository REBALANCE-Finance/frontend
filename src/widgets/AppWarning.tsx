import { CloseButton, Flex, Text } from "@chakra-ui/react";
import React, { useState } from "react";

const WARNING_BANNER = "open-warning-banner";
const InfoText = import.meta.env.VITE_WARNING_TEXT;
const localStateWornBanner = localStorage.getItem(WARNING_BANNER);
const isWarningBannerOpen = localStateWornBanner ? JSON.parse(localStateWornBanner) : true;

export const AppWarning = () => {
  const [isOpenWarn, setOpenWarn] = useState(isWarningBannerOpen);

  const handleClose = () => {
    localStorage.setItem(WARNING_BANNER, "false");
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
      <Text>{InfoText ?? "Info"}</Text>

      <CloseButton position="absolute" top="0" right="0" size="sm" onClick={handleClose} />
    </Flex>
  );
};
