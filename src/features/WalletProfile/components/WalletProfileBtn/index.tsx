import { Button, Center, Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import React, { FC, useEffect } from "react";

import { JazzIcon } from "../../../../components/address-icon/JazzIcon";
import { ellipsis } from "../../../../utils";
import Icon from "@/components/icon";
import { ICON_NAMES } from "@/consts";
import { useAccount, useDisconnect } from "wagmi";

interface IWalletProfileBtnProps {
  address: string;
  onOpen: () => void;
  className: string;
}

export const WalletProfileBtn: FC<IWalletProfileBtnProps> = ({ onOpen, address, className }) => {
  const { connector } = useAccount();
  const { disconnect, disconnectAsync, reset } = useDisconnect();

  const onDisconnect = async () => {
    if (connector && typeof connector.disconnect === "function") {
      try {
        await disconnectAsync({ connector });
        reset();
        console.log("Successfully disconnected");
      } catch (e) {
        console.error("Error during disconnection:", e);
      }
    } else {
      console.warn("Connector does not support disconnect. Falling back to default.");
      try {
        disconnect();
        reset();
        console.log("Successfully disconnected using fallback");
      } catch (e) {
        console.error("Error during fallback disconnection:", e);
      }
    }
  };

  return (
    <Flex as={Button} gap="6px" align="center" onClick={onOpen}>
      <JazzIcon address={address} />
      <Text mr={4}>{ellipsis(String(address))}</Text>
      <Center height="20px">
        <Divider orientation="vertical" />
      </Center>
      <IconButton
        ml={0}
        aria-label="logout"
        onClick={onDisconnect}
        icon={<Icon size="m" name={ICON_NAMES.logoutSquare} />}
      />
    </Flex>
  );
};
