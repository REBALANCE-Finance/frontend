import { Button, Center, Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { FC } from "react";

import { JazzIcon } from "../../../../components/address-icon/JazzIcon";
import { ellipsis } from "../../../../utils";
import Icon from "@/components/icon";
import { ICON_NAMES } from "@/consts";
import { useDisconnect } from "wagmi";

interface IWalletProfileBtnProps {
  address: string;
  onOpen: () => void;
  className: string;
}

export const WalletProfileBtn: FC<IWalletProfileBtnProps> = ({ onOpen, address, className }) => {
  const { disconnect } = useDisconnect();
  return (
    // <Flex as={Button} gap="6px" align="center" onClick={onOpen}>
    <Flex as={Button} gap="6px" align="center" className={className}>
      <JazzIcon address={address} />
      <Text mr={4}>{ellipsis(String(address))}</Text>
      <Center height="20px">
        <Divider orientation="vertical" />
      </Center>
      <IconButton
        ml={0}
        aria-label="logout"
        onClick={() => disconnect()}
        icon={<Icon size="m" name={ICON_NAMES.logoutSquare} />}
      />
    </Flex>
  );
};
