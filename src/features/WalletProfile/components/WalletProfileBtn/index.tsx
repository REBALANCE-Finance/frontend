import { Button, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";

import { JazzIcon } from "../../../../components/address-icon/JazzIcon";
import { ellipsis } from "../../../../utils";

interface IWalletProfileBtnProps {
  address: string;
  onOpen: () => void;
}

export const WalletProfileBtn: FC<IWalletProfileBtnProps> = ({ onOpen, address }) => {
  return (
    <Flex as={Button} gap="6px" align="center" onClick={onOpen}>
      <JazzIcon address={address} />

      <Text>{ellipsis(String(address))}</Text>
    </Flex>
  );
};
