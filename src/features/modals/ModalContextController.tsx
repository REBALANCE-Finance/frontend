import { observer } from "mobx-react-lite";
import React from "react";

import { useStore } from "../../hooks/useStoreContext";
import { ModalContextEnum } from "../../store/modal/types";
import { RejectModal } from "./reject-modal";
import { SuccessModal } from "./success-modal";

export const ModalContextController = observer(() => {
  const { type, isOpen, closeModal, props } = useStore("modalContextStore");

  const renderModal = (modalType: ModalContextEnum) => {
    switch (modalType) {
      case ModalContextEnum.Success:
        return <SuccessModal isOpen={isOpen} onClose={closeModal} {...props} />;
      case ModalContextEnum.Reject:
        return <RejectModal isOpen={isOpen} onClose={closeModal} {...props} />;
    }
  };

  return <>{type && renderModal(type)}</>;
});
