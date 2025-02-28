import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from "wagmi";
import { ABI_REBALANCE } from "../abi/rebalance";
import { ARB_CONFIRMATIONS_COUNT, BSC_CONFIRMATIONS_COUNT } from "@/consts";
import { useStore } from "./useStoreContext";
import { ModalContextEnum } from "@/store/modal/types";
import { arbitrum } from "viem/chains";
import { getConfirmationsCount } from "@/utils";

export const useWithdraw = (
  poolAddress: `0x${string}`,
  onClose: () => void,
  onRetry: () => void
) => {
  const { chainId } = useAccount();
  const [isLoading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const { openModal } = useStore("modalContextStore");
  const { activeChain } = useStore("poolsStore");
  const { writeContractAsync } = useWriteContract();

  const {
    isLoading: waitingReceipt,
    isSuccess: isReceiptSuccess,
    isError: isReceiptError,
    error: receiptError
  } = useWaitForTransactionReceipt({
    hash: txHash as `0x${string}`,
    confirmations: getConfirmationsCount(activeChain)
  });

  useEffect(() => {
    if (isReceiptSuccess && txHash) {
      onClose();
      openModal({
        type: ModalContextEnum.Success,
        props: {
          txHash,
          chainName: chainId === arbitrum.id ? "Arbitrum" : "BSC"
        }
      });
    } else if (isReceiptError && receiptError) {
      openModal({
        type: ModalContextEnum.Reject,
        props: {
          title: "Transaction error",
          content: receiptError.message,
          onRetry
        }
      });
    }
  }, [isReceiptSuccess, isReceiptError, txHash, receiptError, onClose, onRetry]);

  const instantWithdraw = async ({
    address,
    assets
  }: {
    address: `0x${string}`;
    assets: bigint;
  }) => {
    try {
      setLoading(true);
      const tx = await writeContractAsync({
        address: poolAddress,
        abi: ABI_REBALANCE,
        functionName: "withdraw",
        args: [assets, address, address]
      });
      setTxHash(tx);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  return {
    instantWithdraw,
    isLoading: isLoading || waitingReceipt
  };
};
