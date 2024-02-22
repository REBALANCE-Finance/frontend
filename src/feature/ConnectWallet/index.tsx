import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";

export const ConnectWallet = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button p="0" onClick={onOpen}>
        Connect wallet
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At in cupiditate libero
            tempora minus possimus vero veniam deleniti quidem magni, esse pariatur itaque, ab
            beatae suscipit. In suscipit sit debitis!
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
