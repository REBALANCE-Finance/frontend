import { Button } from "@chakra-ui/react";
import React, { FC } from "react";
import { useAccount } from "wagmi";

import { useStore } from "../../../hooks/useStoreContext";
import { ModalEnum } from "../../../store/modal/types";
import { ConnectWallet } from "../../ConnectWallet";

interface IDepositProps {
  pool: any;
  variant?: string;
  minHeight?: string;
}

export const DepositLendingButton: FC<IDepositProps> = ({ pool, variant, minHeight }) => {
  const { openModal } = useStore("modalStore");
  const { address } = useAccount();
  const handleOpenModal = () => {
    openModal({ type: ModalEnum.Deposit, props: { pool, type: ModalEnum.Deposit } });
  };

  if (!address) {
    return <ConnectWallet title="Deposit" minHeight={minHeight} />;
  }

  return (
    <Button
      variant={variant ?? "primaryFilled"}
      flex="1 1 0"
      minHeight={minHeight}
      onClick={e => {
        e.stopPropagation();
        handleOpenModal();
      }}
    >
      Deposit
    </Button>
  );
};
