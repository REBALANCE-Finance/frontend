import { FC } from "react";
import { Flex, IconButton, ModalBody, ModalHeader } from "@chakra-ui/react";
import { IDefaultModalProps } from "../types";
import Icon from "@/components/icon";
import { ICON_NAMES } from "@/consts";
import VaultForm from "@/components/vault/form";
import { Modal } from "../../../components/modal";

const VaultModal: FC<IDefaultModalProps> = ({ isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose} maxWidth="528px" isCloseBtn={false}>
    <ModalHeader
      fontSize="20px"
      lineHeight="22px"
      fontWeight={500}
      color="#EAEAEA"
      pt={6}
      pb={0}
      px={6}
    >
      <Flex justify="space-between" alignItems="center">
        Activate Terminus
        <IconButton
          aria-label="close"
          icon={<Icon name={ICON_NAMES.close} />}
          boxSize="24px"
          minW={0}
          onClick={onClose}
        />
      </Flex>
    </ModalHeader>

    <ModalBody h="max-content">
      <VaultForm
        startAmount={{
          token: 350,
          usd: 100
        }}
        projectedProfit={{
          token: 545,
          usd: 191
        }}
        apy={155.9}
      />
    </ModalBody>
  </Modal>
);

export default VaultModal;
