import { Button } from "@chakra-ui/react";
import React, { FC } from "react";
import { useAccount } from "wagmi";

import { useBalanceOfAsset } from "../../../hooks/useBalanceOfAsset";
import { useStore } from "../../../hooks/useStoreContext";
import { ModalEnum } from "../../../store/modal/types";

interface IWithdrawProps {
  pool: any;
  variant?: string;
  disabled?: boolean;
}

export const WithdrawLendingButton: FC<IWithdrawProps> = ({ pool, variant, disabled }) => {
  const { openModal } = useStore("modalStore");
  const { address } = useAccount();
  const { balance } = useBalanceOfAsset(pool.rebalancerAddress, address ?? "0x", pool.decimals);
  const handleOpenModal = () => {
    openModal({ type: ModalEnum.Withdraw, props: { pool, type: ModalEnum.Withdraw } });
  };
  if (!balance) return;

  return (
    <Button
      variant={variant ?? "secondaryOutline"}
      disabled={true}
      flex="1 1 0"
      onClick={e => {
        if (disabled) return;
        e.stopPropagation();
        handleOpenModal();
      }}
    >
      Withdraw
    </Button>
  );
};
