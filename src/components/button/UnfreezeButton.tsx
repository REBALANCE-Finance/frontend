import { ABI_REBALANCE } from "@/abi/rebalance";
import { ARB_CONFIRMATIONS_COUNT, LOCK_TOKENS_CONTRACT_ADDRESS } from "@/consts";
import { Button, useEditable } from "@chakra-ui/react";
import { useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import INTEREST_LOCKER_ABI from "@/abi/InterestLocker.json";
import { useEffect } from "react";
import { useStore } from "@/hooks/useStoreContext";
import { ModalContextEnum } from "@/store/modal/types";

type UnfreezeButtonProps = {
  lockId: number;
  onSuccessUnlock: VoidFunction;
};

const UnfreezeButton = ({ lockId, onSuccessUnlock }: UnfreezeButtonProps) => {
  const { data: unlockData, writeContract: onUnlock, isPending } = useWriteContract();
  const { openModal } = useStore("modalContextStore");

  const {
    data: unlockContractData,
    isLoading: isSimulating,
    error: simulatingError
  } = useSimulateContract({
    address: LOCK_TOKENS_CONTRACT_ADDRESS,
    abi: INTEREST_LOCKER_ABI,
    functionName: "unlockTokens",
    args: [lockId]
  });

  const { isLoading, isSuccess, isError, error } = useWaitForTransactionReceipt({
    hash: unlockData,
    confirmations: ARB_CONFIRMATIONS_COUNT
  });

  console.log("unclock errors", simulatingError, error);

  const onUnlockToken = () => {
    if (onUnlock && unlockContractData?.request) {
      onUnlock(unlockContractData.request);
    }
  };

  useEffect(() => {
    if (isSuccess && unlockData) {
      onSuccessUnlock();
      openModal({
        type: ModalContextEnum.Success,
        props: {
          txHash: unlockData
        }
      });
    } else if (isError) {
      openModal({
        type: ModalContextEnum.Reject,
        props: {
          title: "Unfreeze failed",
          content: error.message,
          onRetry: onUnlockToken
        }
      });
    }
  }, [isSuccess, isError]);

  return (
    <Button
      onClick={onUnlockToken}
      w="100%"
      border="1px solid"
      borderColor="black.40"
      minH="44px"
      isDisabled={isLoading || isPending || isSimulating}
    >
      {isLoading || isPending ? "Processing..." : "Unfreeze"}
    </Button>
  );
};

export default UnfreezeButton;
