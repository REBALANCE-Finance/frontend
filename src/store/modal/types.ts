import {
  IDefaultModalProps,
  IErrorModalContextProps,
  IFreezeModalContextProps,
  ISuccessModalContextProps,
  ITasksModalProps,
  ITxModalContextProps
} from "../../features/modals/types";

export enum ModalEnum {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
  Borrow = "Borrow",
  Repay = "Repay",
  TxSuccess = "TxSuccess",
  TxError = "TxError",
  Freeze = "Freeze",
  ConnectWallet = "ConnectWallet",
  Tasks = "Tasks",
  Vault = "Vault"
}

export enum ModalContextEnum {
  Success = "Success",
  Reject = "Reject",
  Freeze = "Freeze"
}

type Props<T> = Partial<T>;

export type IOpenModalArgs =
  | {
      type: ModalEnum.Deposit;
      props?: Props<IDefaultModalProps>;
    }
  | {
      type: ModalEnum.Withdraw;
      props?: Props<IDefaultModalProps>;
    }
  | {
      type: ModalEnum.Borrow;
      props?: Props<IDefaultModalProps>;
    }
  | {
      type: ModalEnum.Repay;
      props?: Props<IDefaultModalProps>;
    }
  | {
      type: ModalEnum.TxSuccess;
      props?: Props<ISuccessModalContextProps>;
    }
  | {
      type: ModalEnum.TxError;
      props?: Props<IErrorModalContextProps>;
    }
  | {
      type: ModalEnum.Freeze;
      props?: Props<IFreezeModalContextProps>;
    }
  | {
      type: ModalEnum.Tasks;
      props?: Props<ITasksModalProps>;
    }
  | {
      type: ModalEnum.Vault;
      props?: Props<IDefaultModalProps>;
    };

export type IOpenModalContextArgs =
  | {
      type: ModalContextEnum.Success;
      props?: ITxModalContextProps;
    }
  | { type: ModalContextEnum.Reject; props?: ITxModalContextProps }
  | { type: ModalContextEnum.Freeze; props?: ITxModalContextProps };
