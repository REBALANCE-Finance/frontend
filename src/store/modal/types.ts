import { IDefaultModalProps } from "../../features/modals/types";

export enum ModalEnum {
  Deposit = "Deposit",
  Withdraw = "Withdraw",
  Borrow = "Borrow",
  Repay = "Repay"
}

export enum ModalContextEnum {
  Success = "Success",
  Reject = "Reject"
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

export type IOpenModalContextArgs =
  | {
      type: ModalContextEnum.Success;
      props?: IDefaultModalProps;
    }
  | { type: ModalContextEnum.Reject; props?: IDefaultModalProps };
