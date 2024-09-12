import { Button, ButtonProps } from "@chakra-ui/react";
import React, { FC } from "react";
import { useAccount } from "wagmi";

import { useStore } from "../../../hooks/useStoreContext";
import { ModalEnum } from "../../../store/modal/types";
import { ConnectWallet } from "../../ConnectWallet";
import { useAnalyticsEventTracker } from "@/hooks/useAnalyticsEventTracker";
import { getIdByToken } from "@/utils/analytics";

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
  const event = useAnalyticsEventTracker();

  const handleOpenModal = () => {
    openModal({ type: ModalEnum.Deposit, props: { pool, type: ModalEnum.Deposit } });
  };

  const onClickDepositStart = () => {
    event({
      action: `Click_Deposit_start_${getIdByToken(pool.token)}`,
      label: `Click Deposit start "${getIdByToken(pool.token)}"`
    });
  };

  const onClickDeposit = () => {
    event({
      action: `Click_Deposit_${getIdByToken(pool.token)}`,
      label: `Click Deposit "${getIdByToken(pool.token)}"`
    });
  };

  if (!address) {
    return (
      <ConnectWallet
        title="Deposit"
        minHeight={minHeight}
        className={className}
        id={id}
        onClick={onClickDepositStart}
      />
    );
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
        onClickDeposit();
        handleOpenModal();
      }}
    >
      Deposit
    </Button>
  );
};
