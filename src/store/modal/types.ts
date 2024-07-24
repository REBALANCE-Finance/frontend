import {
  IDefaultModalProps,
  IErrorModalContextProps,
  IFreezeModalContextProps,
  ISuccessModalContextProps,
  ITxModalContextProps
} from "../../features/modals/types";

export enum ModalEnum {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
  Borrow = "Borrow",
  Repay = "Repay",
  TxSuccess = "TxSuccess",
  TxError = "TxError",
  Freeze = "Freeze"
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
    };

export type IOpenModalContextArgs =
  | {
      type: ModalContextEnum.Success;
      props?: ITxModalContextProps;
    }
  | { type: ModalContextEnum.Reject; props?: ITxModalContextProps }
  | { type: ModalContextEnum.Freeze; props?: ITxModalContextProps };
