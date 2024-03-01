import { Button, Flex, ModalBody, Text, VStack } from "@chakra-ui/react";
import React, { FC } from "react";

import { Icon } from "../../../components/icon";
import { Modal } from "../../../components/modal";
import { ICON_NAMES } from "../../../consts";
import { IDefaultModalContextProps } from "../types";

export const SuccessModal: FC<IDefaultModalContextProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCloseBtn={false}>
      <ModalBody>
        <VStack gap="24px">
          <Icon name={ICON_NAMES.trxSuccess} size="112px" />

          <Text fontSize="22px" fontWeight="500">
            Transaction Successful
          </Text>
          <Text>Your transaction is completed successfully:</Text>

          <Flex align="center" justify="center" w="100%" bg="black.70" p="16px 0" gap="8px">
            <Text color="greenAlpha.80">342lkdfjw3sdvkjsn435kjebvd823hindsefn83en8i38</Text>
            <Icon name={ICON_NAMES.checkboxMultipleBlank} size="sm" />
          </Flex>

          <Button variant="primaryFilled" w="100%" onClick={onClose}>
            Close
          </Button>
        </VStack>
      </ModalBody>
    </Modal>
  );
};
