import { Button, Flex, ModalBody, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";

import Icon from "../../../components/icon";
import { Modal } from "../../../components/modal";
import { ICON_NAMES } from "../../../consts";
import { IDefaultModalContextProps } from "../types";

export const RejectModal: FC<IDefaultModalContextProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCloseBtn={false}>
      <ModalBody>
        <VStack gap="24px">
          <Icon name={ICON_NAMES.trxRejected} size="112px" />

          <Text fontSize="22px" fontWeight="500">
            Transaction Rejected
          </Text>
          <Text>
            It seems like you rejected the transaction on your wallet. If you did it by mistake,
            please try to submit the transaction again.
          </Text>

          <Flex w="100%" align="center" gap="16px">
            <Button variant="primaryFilled" w="100%">
              Try again
            </Button>
            <Button variant="outline" w="100%" onClick={onClose}>
              Close
            </Button>
          </Flex>
        </VStack>
      </ModalBody>
    </Modal>
  );
};
