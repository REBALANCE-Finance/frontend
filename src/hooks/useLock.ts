import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ABI_REBALANCE } from "../abi/rebalance";
import INTEREST_LOCKER_ABI from "../abi/InterestLocker.json";
import {
  ARB_CONFIRMATIONS_COUNT,
  LOCAL_STORAGE_KEYS,
  LOCK_TOKENS_CONTRACT_ADDRESS
} from "@/consts";
import { useStore } from "./useStoreContext";
import { ModalContextEnum } from "@/store/modal/types";
import localStore from "@/utils/localStore";

export const useLock = (
  poolAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
  onClose: VoidFunction,
  setConfirmedApprove: (value: boolean) => void,
  onRetry?: VoidFunction
) => {
  const [isLoading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();
  const { openModal } = useStore("modalContextStore");
  const isActiveTutorial = !localStore.getData(LOCAL_STORAGE_KEYS.isShownTutorial) || false;
  const { writeContractAsync } = useWriteContract();
  const { data: allowance } = useReadContract({
    address: poolAddress,
    abi: ABI_REBALANCE,
    functionName: "allowance",
    args: [address ?? "0x", LOCK_TOKENS_CONTRACT_ADDRESS],
    query: {
      refetchInterval: 3000
    }
  });

  const {
    isLoading: waitingReceipt,
    isSuccess: isReceiptSuccess,
    isError: isReceiptError,
    error: receiptError
  } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
    confirmations: ARB_CONFIRMATIONS_COUNT
  });

  useEffect(() => {
    if (isReceiptSuccess && txHash) {
      setIsSuccess(true);
      onClose();
      openModal({
        type: ModalContextEnum.Success,
        props: {
          txHash
        }
      });
    } else if (isReceiptError && receiptError) {
      openModal({
        type: ModalContextEnum.Reject,
        props: {
          title: "Transaction error",
          content: receiptError.message,
          onRetry: onRetry ? onRetry : () => {}
        }
      });
    }
  }, [isReceiptSuccess, isReceiptError, txHash, receiptError]);

  const lockTokens = async ({
    tokenAddress,
    amount,
    durationInSeconds
  }: {
    tokenAddress: `0x${string}`;
    amount: bigint;
    durationInSeconds: bigint;
  }) => {
    try {
      setLoading(true);

      const tx = await writeContractAsync({
        address: LOCK_TOKENS_CONTRACT_ADDRESS,
        abi: INTEREST_LOCKER_ABI,
        functionName: "lockTokens",
        args: [tokenAddress, amount, durationInSeconds]
      });

      setTxHash(tx);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const approve = async ({ value }: { value: bigint }) => {
    try {
      setLoading(true);
      await writeContractAsync({
        address: poolAddress,
        abi: ABI_REBALANCE,
        functionName: "approve",
        args: [LOCK_TOKENS_CONTRACT_ADDRESS, value]
      }).then(() => {
        setLoading(false);
        setConfirmedApprove(true);
      });
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return {
    allowance,
    lockTokens,
    approve,
    isLoading: isLoading || waitingReceipt,
    isSuccess
  };
};
