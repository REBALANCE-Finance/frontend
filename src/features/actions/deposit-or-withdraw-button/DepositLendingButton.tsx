import { Button } from "@chakra-ui/react";
import React, { FC } from "react";

import { useStore } from "../../../hooks/useStoreContext";
import { ModalEnum } from "../../../store/modal/types";

interface IDepositProps {
  pool: any;
  variant?: string;
}

export const DepositLendingButton: FC<IDepositProps> = ({ pool, variant }) => {
  const { openModal } = useStore("modalStore");

  const handleOpenModal = () => {
    openModal({ type: ModalEnum.Deposit, props: { pool, type: ModalEnum.Deposit } });
  };
  return (
    <Button
      variant={variant ?? "primaryFilled"}
      flex="1 1 0"
      onClick={e => {
        e.stopPropagation();
        handleOpenModal();
      }}
    >
      Deposit
    </Button>
  );
};
