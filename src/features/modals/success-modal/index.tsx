import {
  Button,
  Flex,
  IconButton,
  Link,
  ModalBody,
  ModalContent,
  Text,
  VStack
} from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";

import Icon from "../../../components/icon";
import { Modal } from "../../../components/modal";
import { ICON_NAMES } from "../../../consts";
import { ISuccessModalContextProps } from "../types";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { getExplorerTxLink } from "@/utils";

export const SuccessModal: FC<ISuccessModalContextProps> = ({ isOpen, onClose, txHash, id }) => {
  const copy = useCopyToClipboard();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (isOpen) {
      setCountdown(10);

      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev === 1) {
            clearInterval(timer);
            onClose();
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen, onClose]);

  const handleCopyAddress = () => {
    if (txHash) {
      copy(txHash);
    }
  };

  const handleOpenExplorer = () => {
    if (txHash) {
      window.open(getExplorerTxLink(txHash), "_blank");
    }
  };

  return (
    <Modal id={id} isOpen={isOpen} onClose={onClose} isCloseBtn={false}>
      <ModalContent bg="black.60" width="100%" maxWidth="648px">
        <ModalBody maxW="648px" width="100%" p="24px">
          <VStack gap="24px">
            <Icon name={ICON_NAMES.trxSuccess} size="112px" />

            <Text fontSize="22px" fontWeight="600">
              Transaction Successful
            </Text>
            <Flex flexDir="column" gap="8px" alignItems="center" w="100%">
              <Text>Your transaction is completed successfully:</Text>

              <Flex
                align="center"
                justify="center"
                w="100%"
                bg="black.70"
                p="12px"
                gap="8px"
                borderRadius="4px"
              >
                <Text
                  color="greenAlpha.80"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {txHash}
                </Text>
                <IconButton
                  aria-label="copy"
                  icon={<Icon name={ICON_NAMES.checkboxMultipleBlank} size="sm" />}
                  onClick={handleCopyAddress}
                />
              </Flex>
            </Flex>
            <Flex flexDir="column" gap="12px" w="100%">
              <Button
                variant="primaryFilled"
                w="100%"
                minH="44px"
                backgroundColor="greenAlpha.40"
                _hover={{ opacity: 0.8 }}
                onClick={handleOpenExplorer}
              >
                View on Arbiscan
              </Button>
              <Button
                variant="primaryFilled"
                w="100%"
                minH="44px"
                _hover={{ opacity: 0.8 }}
                onClick={onClose}
              >
                Close
                <span style={{ color: "darkgray", marginLeft: "4px" }}>({countdown}sec)</span>
              </Button>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
