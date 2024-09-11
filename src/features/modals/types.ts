import { ModalProps } from "@chakra-ui/react";

import { ModalContextEnum, ModalEnum } from "../../store/modal/types";
import { TaskData } from "@/types";
import { Dispatch, SetStateAction } from "react";

export interface IDefaultModalProps {
  isOpen: ModalProps["isOpen"];
  onClose: ModalProps["onClose"];
  pool?: any;
  type: ModalEnum;
}

export interface IDefaultModalContextProps extends Omit<IDefaultModalProps, "type"> {
  type: ModalContextEnum;
}

export interface ISuccessModalProps {
  txHash: string;
}

export interface IErrorModalProps {
  title: string;
  content: string;
  onRetry: VoidFunction;
}

export interface IFreezeModalProps {
  amount: string;
  symbol: string;
}

export interface ITasksModalProps extends IDefaultModalProps {
  loadingTask: TaskData;
  isSuccessTask: TaskData;
  setLoadingTask: Dispatch<SetStateAction<TaskData>>;
  setIsSuccessTask: Dispatch<SetStateAction<TaskData>>;
}

export interface ISuccessModalContextProps extends IDefaultModalProps {
  txHash?: string;
}

export interface IErrorModalContextProps extends IDefaultModalProps {
  title?: string;
  content?: string;
  onRetry?: VoidFunction;
}

export interface IFreezeModalContextProps extends IDefaultModalProps {
  amount?: string;
  symbol?: string;
}

export type ITxModalContextProps = ISuccessModalProps | IErrorModalProps | IFreezeModalProps;
