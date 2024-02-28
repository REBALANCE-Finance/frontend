import { IDefaultModalProps } from "../../features/modals/types";

export enum ModalEnum {
  SuccessTrx = "SuccessTrx",
  ErrorTrx = "ErrorTrx",
  Deposit = "Deposit",
  Withdraw = "Withdraw",
  Borrow = "Borrow",
  Repay = "Repay"
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
    };
