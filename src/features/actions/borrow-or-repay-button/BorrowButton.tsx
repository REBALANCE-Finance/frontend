import { Button } from "@chakra-ui/react";
import React, { FC } from "react";

import { useStore } from "../../../hooks/useStoreContext";
import { ModalEnum } from "../../../store/modal/types";

interface IBorrowButtonProps {
  pool: any;
}

export const BorrowButton: FC<IBorrowButtonProps> = ({ pool }) => {
  const { openModal } = useStore("modalStore");

  const handleOpenModal = e => {
    e.stopPropagation();
    openModal({ type: ModalEnum.Borrow, props: { pool, type: ModalEnum.Borrow } });
  };
  return (
    <Button variant="primaryFilled" flex="1 1 0" onClick={handleOpenModal}>
      Borrow
    </Button>
  );
};
