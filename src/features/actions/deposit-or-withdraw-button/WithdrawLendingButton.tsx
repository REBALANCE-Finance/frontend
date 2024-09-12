import { Button, ButtonProps, useEditable } from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { useBalanceOfAsset } from "../../../hooks/useBalanceOfAsset";
import { useStore } from "../../../hooks/useStoreContext";
import { ModalEnum } from "../../../store/modal/types";
import { getLocks } from "@/api/points/queries";
import { formatBigNumber } from "@/utils/formatBigNumber";

interface IWithdrawProps {
  pool: any;
  variant?: string;
  disabled?: boolean;
  minHeight?: string;
  ButtonProps?: ButtonProps;
}

export const WithdrawLendingButton: FC<IWithdrawProps> = ({
  pool,
  variant,
  disabled,
  minHeight,
  ButtonProps
}) => {
  const { openModal } = useStore("modalStore");
  const { address } = useAccount();
  const { balance } = useBalanceOfAsset(pool.rebalancerAddress, address ?? "0x", pool.decimals);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    if (address && balance) {
      getLocks(address, pool.token).then(data => {
        const amountsBigInt = data.map(item => item.amount);
        const amountsNumbers = amountsBigInt.map(item =>
          Number(formatBigNumber(item, pool.decimals))
        );

        const totalLockedAmount = amountsNumbers.reduce((acc, item) => acc + item, 0);
        setTotalBalance(balance + totalLockedAmount);
      });
    }
  }, [address, balance]);

  const handleOpenModal = () => {
    openModal({ type: ModalEnum.Withdraw, props: { pool, type: ModalEnum.Withdraw } });
  };
  if (totalBalance < 0.01) return;

  return (
    <Button
      variant={variant ?? "secondaryOutline"}
      disabled={true}
      flex="1 1 0"
      minH={minHeight}
      {...ButtonProps}
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
