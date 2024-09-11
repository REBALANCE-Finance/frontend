import { useState, useEffect } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ABI_REBALANCE } from "../abi/rebalance";
import { ARB_CONFIRMATIONS_COUNT, LOCAL_STORAGE_KEYS } from "@/consts";
import { useStore } from "./useStoreContext";
import { ModalContextEnum } from "@/store/modal/types";
import localStore from "@/utils/localStore";

export const useDeposit = (
  poolAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
  onClose: VoidFunction,
  onRetry?: VoidFunction,
  needClose?: boolean
) => {
  const [isLoading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const { address } = useAccount();
  const { openModal } = useStore("modalContextStore");
  const isActiveTutorial = !localStore.getData(LOCAL_STORAGE_KEYS.isShownTutorial) || false;
  const { writeContractAsync } = useWriteContract();
  const { data: allowance } = useReadContract({
    address: tokenAddress,
    abi: ABI_REBALANCE,
    functionName: "allowance",
    args: [address ?? "0x", poolAddress]
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
      if (needClose) {
        onClose();
        openModal({
          type: ModalContextEnum.Success,
          props: {
            txHash
          }
        });
      }
      setIsSuccess(true);
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

  const deposit = async ({ value, address }: { value: bigint; address: `0x${string}` }) => {
    try {
      setLoading(true);
      const tx = await writeContractAsync({
        address: poolAddress,
        abi: ABI_REBALANCE,
        functionName: "deposit",
        args: [value, address]
      });
      setTxHash(tx);
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const approve = async ({
    value,
    tokenAddress
  }: {
    value: bigint;
    tokenAddress: `0x${string}`;
  }) => {
    try {
      setLoading(true);
      await writeContractAsync({
        address: tokenAddress,
        abi: ABI_REBALANCE,
        functionName: "approve",
        args: [poolAddress, value]
      });
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return {
    allowance,
    deposit,
    approve,
    isLoading: isLoading || waitingReceipt,
    isSuccess
  };
};
