import { Button } from "@chakra-ui/react";
import React, { FC } from "react";

import { useStore } from "../../../hooks/useStoreContext";
import { ModalEnum } from "../../../store/modal/types";

interface IRepayButtonProps {
  pool: any;
}

export const RepayButton: FC<IRepayButtonProps> = ({ pool }) => {
  const { openModal } = useStore("modalStore");

  const handleOpenModal = () => {
    openModal({ type: ModalEnum.Repay, props: { pool, type: ModalEnum.Repay } });
  };
  return (
    <Button variant="secondaryOutline" flex="1 1 0" onClick={handleOpenModal}>
      Repay
    </Button>
  );
};
