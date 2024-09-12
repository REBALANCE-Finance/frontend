import { Button, ButtonProps } from "@chakra-ui/react";
import React, { FC } from "react";
import { useAccount } from "wagmi";

import { useStore } from "../../../hooks/useStoreContext";
import { ModalEnum } from "../../../store/modal/types";
import { ConnectWallet } from "../../ConnectWallet";

interface IDepositProps {
  pool: any;
  variant?: string;
  minHeight?: string;
  className?: string;
  ButtonProps?: ButtonProps;
  id?: string;
}

export const DepositLendingButton: FC<IDepositProps> = ({
  pool,
  variant,
  minHeight,
  className,
  ButtonProps,
  id
}) => {
  const { openModal } = useStore("modalStore");
  const { address } = useAccount();
  const handleOpenModal = () => {
    openModal({ type: ModalEnum.Deposit, props: { pool, type: ModalEnum.Deposit } });
  };

  if (!address) {
    return <ConnectWallet title="Deposit" minHeight={minHeight} className={className} id={id} />;
  }

  return (
    <Button
      id={id}
      variant={variant ?? "primaryFilled"}
      flex="1 1 0"
      minHeight={minHeight}
      className={className}
      {...ButtonProps}
      onClick={e => {
        e.stopPropagation();
        handleOpenModal();
      }}
    >
      Deposit
    </Button>
  );
};
