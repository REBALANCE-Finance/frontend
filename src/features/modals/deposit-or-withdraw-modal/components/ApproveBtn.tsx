import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { ABI_REBALANCE } from "../../../../abi/rebalance";
import { ARB_CONFIRMATIONS_COUNT, BSC_CONFIRMATIONS_COUNT } from "@/consts";
import { arbitrum } from "viem/chains";
import { useStore } from "@/hooks/useStoreContext";
import { getConfirmationsCount } from "@/utils";

const ApproveBtn = ({
  value,
  poolAddress,
  tokenAddress,
  setConfirmedApprove,
  isDisabled,
  id,
  onClick
}: {
  value: bigint;
  tokenAddress: `0x${string}`;
  poolAddress: `0x${string}`;
  setConfirmedApprove: (value: boolean) => void;
  isDisabled?: boolean;
  id?: string;
  onClick?: VoidFunction;
}) => {
  const { chainId } = useAccount();
  const { data: hash, writeContract } = useWriteContract();
  const { activeChain } = useStore("poolsStore");
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({
    hash,
    confirmations: getConfirmationsCount(activeChain)
  });

  const approve = () => {
    if (onClick) {
      onClick();
    }

    writeContract({
      address: tokenAddress,
      abi: ABI_REBALANCE,
      functionName: "approve",
      args: [poolAddress, value]
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setConfirmedApprove(isSuccess);
    }
  }, [isSuccess]);

  return (
    <Button id={id} variant="primaryFilled" isDisabled={isDisabled} onClick={() => approve()}>
      {isLoading ? "Processing..." : "Approve"}
    </Button>
  );
};

export default ApproveBtn;
