import { ModalProps } from "@chakra-ui/react";

import { ModalContextEnum, ModalEnum } from "../../store/modal/types";

export interface IDefaultModalProps {
  isOpen: ModalProps["isOpen"];
  onClose: ModalProps["onClose"];
  pool: any;
  type: ModalEnum;
}

export interface IDefaultModalContextProps extends Omit<IDefaultModalProps, "type"> {
  type: ModalContextEnum;
}
