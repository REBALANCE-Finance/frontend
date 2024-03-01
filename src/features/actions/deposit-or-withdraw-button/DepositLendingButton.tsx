import { Button } from "@chakra-ui/react";
import React, { FC } from "react";

import { useStore } from "../../../hooks/useStoreContext";
import { ModalEnum } from "../../../store/modal/types";

interface IDepositProps {
  pool: any;
}

export const DepositLendingButton: FC<IDepositProps> = ({ pool }) => {
  const { openModal } = useStore("modalStore");

  const handleOpenModal = e => {
    e.stopPropagation();
    openModal({ type: ModalEnum.Deposit, props: { pool, type: ModalEnum.Deposit } });
  };
  return (
    <Button variant="primaryFilled" flex="1 1 0" onClick={handleOpenModal}>
      Deposit
    </Button>
  );
};
