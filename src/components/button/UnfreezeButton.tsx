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
  amount: number;
  token: string;
  autoRun: boolean;
  onChangeBtnIndex: VoidFunction;
  isLast: boolean;
  onLastLockRunned: VoidFunction;
};

const UnfreezeButton = ({
  lockId,
  onSuccessUnlock,
  amount,
  token,
  autoRun,
  onChangeBtnIndex,
  isLast,
  onLastLockRunned
}: UnfreezeButtonProps) => {
  const { data: unlockData, writeContract: onUnlock, isPending } = useWriteContract();
  const { openModal } = useStore("modalContextStore");

  const {
    data: unlockContractData,
    isLoading: isSimulating,
    isSuccess: isSimulated,
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

  const onUnlockToken = () => {
    if (onUnlock && unlockContractData?.request) {
      onUnlock(unlockContractData.request);
    }
  };

  useEffect(() => {
    if (autoRun && isSimulated) {
      onUnlockToken();
    }
  }, [autoRun, isSimulated]);

  useEffect(() => {
    if (isSuccess && unlockData) {
      onChangeBtnIndex();
      onSuccessUnlock();
      if (isLast) {
        onLastLockRunned();
        openModal({
          type: ModalContextEnum.Success,
          props: {
            txHash: unlockData
          }
        });
      }
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
  }, [isSuccess, isError, isLast]);

  return (
    <Button
      onClick={onUnlockToken}
      w="100%"
      border="1px solid"
      borderColor="black.40"
      minH="44px"
      isDisabled={isLoading || isPending || isSimulating || autoRun}
    >
      {isLoading || isPending ? "Processing..." : `Unfreeze ${amount.toFixed(2)} ${token}`}
    </Button>
  );
};

export default UnfreezeButton;
