import { Button, Flex, ModalBody, Text, VStack } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";

import Icon from "../../../components/icon";
import { Modal } from "../../../components/modal";
import { ICON_NAMES } from "../../../consts";
import { IFreezeModalContextProps } from "../types";

export const FreezeModal: FC<IFreezeModalContextProps> = ({ isOpen, onClose, amount, symbol }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCloseBtn={false} maxWidth="648px">
      <ModalBody p={0}>
        <Flex gap={9}>
          <Icon name={ICON_NAMES.trxFreeze} height="298px" width="172px" />
          <Flex flexDir="column" justify="space-between">
            <Text fontSize="22px" fontWeight="600">
              Unlock tokens to deposit
            </Text>
            <Flex flexDir="column" gap={6}>
              <Text>We need your approval to deposit 120.00035 USDT</Text>
              <Text>
                We recommend to select MAX option in your wallet, so you can seamlessly operate with
                the {symbol} in future.
              </Text>
            </Flex>

            <Button
              variant="primaryFilled"
              w="100%"
              minH="44px"
              _hover={{ opacity: 0.8 }}
              onClick={onClose}
            >
              Close
            </Button>
          </Flex>
        </Flex>
      </ModalBody>
    </Modal>
  );
};
