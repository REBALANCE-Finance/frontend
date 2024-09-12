import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { ABI_REBALANCE } from "../../../../abi/rebalance";
import { ARB_CONFIRMATIONS_COUNT } from "@/consts";

const ApproveBtn = ({
  value,
  poolAddress,
  tokenAddress,
  setConfirmedApprove,
  isDisabled
}: {
  value: bigint;
  tokenAddress: `0x${string}`;
  poolAddress: `0x${string}`;
  setConfirmedApprove: (value: boolean) => void;
  isDisabled?: boolean;
}) => {
  const { data: hash, writeContract } = useWriteContract();
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({
    hash,
    confirmations: ARB_CONFIRMATIONS_COUNT
  });

  const approve = () => {
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
  }, [isSuccess, setConfirmedApprove]);

  return (
    <Button variant="primaryFilled" isDisabled={isDisabled} onClick={() => approve()}>
      {isLoading ? "Processing..." : "Approve"}
    </Button>
  );
};

export default ApproveBtn;
