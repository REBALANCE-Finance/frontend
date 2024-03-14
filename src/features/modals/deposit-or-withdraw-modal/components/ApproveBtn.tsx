import { Button } from "@chakra-ui/react";
import { useEffect } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";

import { ABI_REBALANCE } from "../../../../abi/rebalance";

const ApproveBtn = ({
  value,
  poolAddress,
  tokenAddress,
  setConfirmedApprove
}: {
  value: bigint;
  tokenAddress: `0x${string}`;
  poolAddress: `0x${string}`;
  setConfirmedApprove: (value: boolean) => void;
}) => {
  const { data: hash, writeContract } = useWriteContract();
  const { isSuccess, isLoading } = useWaitForTransactionReceipt({
    hash
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
    <Button variant="primaryFilled" onClick={() => approve()}>
      {isLoading ? "Processing..." : "Aprove"}
    </Button>
  );
};

export default ApproveBtn;
