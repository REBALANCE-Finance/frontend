import {
  Modal as DefaultModal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalProps
} from "@chakra-ui/react";
import React, { FC } from "react";

interface IModalProps extends ModalProps {
  isCloseBtn?: boolean;
}

export const Modal: FC<IModalProps> = ({
  isOpen,
  onClose,
  children,
  isCloseBtn = true,
  ...rest
}) => {
  return (
    <DefaultModal isOpen={isOpen} onClose={onClose} {...rest} isCentered>
      <ModalOverlay backdropFilter="auto" backdropBlur="5px" />
      <ModalContent bg="black.100" p="24px" borderRadius="4px" gap="24px">
        {isCloseBtn && <ModalCloseButton color="#626262" zIndex={10} />}
        {children}
      </ModalContent>
    </DefaultModal>
  );
};
