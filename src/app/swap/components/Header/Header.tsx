"use client"

import Icon from "@/components/icon";
import { ICON_NAMES } from "@/consts";
import { ellipsis } from "@/utils";
import { Box, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";

const Header = () => {
  const { address } = useAccount();
  return (
    <Box
      display="flex"
      alignContent="center">
      <Text fontSize="22px">Swap</Text>
      <Text
        marginLeft="auto"
        marginRight="24px"
        fontSize="16px"
        alignContent="center">{ellipsis(String(address))}</Text>
      <Box
        display="flex"
        alignItems="center"
        gap="12px">
        <Icon name={ICON_NAMES.copy} />
        <Icon name={ICON_NAMES.update} />
        <Icon name={ICON_NAMES.settings} />
      </Box>
    </Box>
  )
};

export default Header;