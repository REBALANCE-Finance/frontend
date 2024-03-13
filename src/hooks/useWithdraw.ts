import { useWriteContract } from "wagmi";

import { ABI_REBALANCE } from "../abi/rebalance";

export const useWithdraw = (poolAddress: `0x${string}`) => {
  const { writeContract } = useWriteContract();

  const instantWithdraw = ({ address, assets }: { address: `0x${string}`; assets: bigint }) => {
    writeContract({
      address: poolAddress,
      abi: ABI_REBALANCE,
      functionName: "withdraw",
      args: [assets, address, address]
    });
  };

  return instantWithdraw;
};
