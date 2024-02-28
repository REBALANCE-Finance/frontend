import { ModalProps } from "@chakra-ui/react";

import { ModalEnum } from "../../store/modal/types";

export interface IDefaultModalProps {
  isOpen: ModalProps["isOpen"];
  onClose: ModalProps["onClose"];
  pool: any;
  type: ModalEnum;
}
