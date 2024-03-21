import { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

import { ABI_REBALANCE } from "../abi/rebalance";

export const useDeposit = (
  poolAddress: `0x${string}`,
  tokenAddress: `0x${string}`,
  onClose: () => void
) => {
  const [isLoading, setLoading] = useState(false);
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { data: allowance } = useReadContract({
    address: tokenAddress,
    abi: ABI_REBALANCE,
    functionName: "allowance",
    args: [address ?? "0x", poolAddress]
  });

  const deposit = async ({
    value,
    address,
    onSuccess
  }: {
    value: bigint;
    address: `0x${string}`;
    onSuccess: () => void;
  }) => {
    console.log(value, address);
    try {
      setLoading(true);
      await writeContractAsync(
        {
          address: poolAddress,
          abi: ABI_REBALANCE,
          functionName: "deposit",
          args: [value, address]
        },
        {
          onSuccess(data) {
            onClose();
            console.log("success", data);
          },
          onSettled(data) {
            console.log("settled", data);
          }
        }
      );
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      onSuccess();
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
      console.log(e);
      setLoading(false);
    }
  };

  return {
    allowance,
    deposit,
    approve,
    isLoading
  };
};
