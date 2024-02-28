import { Button } from "@chakra-ui/react";
import React, { FC } from "react";

import { useStore } from "../../../hooks/useStoreContext";
import { ModalEnum } from "../../../store/modal/types";

interface IWithdrawProps {
  pool: any;
}

export const WithdrawLendingButton: FC<IWithdrawProps> = ({ pool }) => {
  const { openModal } = useStore("modalStore");

  const handleOpenModal = () => {
    openModal({ type: ModalEnum.Withdraw, props: { pool, type: ModalEnum.Withdraw } });
  };
  return (
    <Button variant="secondaryOutline" flex="1 1 0" onClick={handleOpenModal}>
      Withdraw
    </Button>
  );
};
