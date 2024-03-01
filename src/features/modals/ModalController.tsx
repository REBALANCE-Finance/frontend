import { observer } from "mobx-react-lite";
import React from "react";

import { useStore } from "../../hooks/useStoreContext";
import { ModalEnum } from "../../store/modal/types";
import { BorrowOrRepayModal } from "./borrow-or-repay-modal/BorrowOrRepayModal";
import { DepositOrWithdrawModal } from "./deposit-or-withdraw-modal/DepositOrWithdrawModal";

export const ModalController = observer(() => {
  const { type, isOpen, closeModal, props } = useStore("modalStore");

  const renderModal = (modalType: ModalEnum) => {
    switch (modalType) {
      case ModalEnum.Deposit:
      case ModalEnum.Withdraw:
        return <DepositOrWithdrawModal isOpen={isOpen} onClose={closeModal} {...props} />;
      case ModalEnum.Borrow:
      case ModalEnum.Repay:
        return <BorrowOrRepayModal isOpen={isOpen} onClose={closeModal} {...props} />;
    }
  };

  return <>{type && renderModal(type)}</>;
});
