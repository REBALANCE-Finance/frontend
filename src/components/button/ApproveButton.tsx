import { Button, useToast } from "@chakra-ui/react";
import {
  useSimulateContract,
  useReadContract,
  useWriteContract,
  useAccount,
  useWaitForTransactionReceipt
} from "wagmi";
import { useEffect } from "react";
import { erc20Abi } from "viem";
import { convertNumberToBigInt, performApprovedAmountValue } from "@/utils";
import { AddressType } from "@/types";
import { ARB_CONFIRMATIONS_COUNT, PARASWAP_SPENDER_ADDRESS } from "@/consts";
import { handlerToast } from "../toasty/utils";
import { ToastyTypes } from "../toasty/types";

type ApproveButtonProps = {
  tokenAddress: string;
  tokenDecimals: number;
  ownerAddress: string;
  spenderAddress: string;
  amount: number; // Amount to approve, as a string to handle large numbers
  isDisabled?: boolean;
  error?: string;
};

const ApproveButton = ({
  tokenAddress,
  tokenDecimals,
  ownerAddress,
  spenderAddress,
  amount,
  isDisabled,
  error
}: ApproveButtonProps) => {
  const toast = useToast();
  const { chainId } = useAccount();

  const { data } = useSimulateContract({
    address: tokenAddress as AddressType,
    abi: erc20Abi,
    functionName: "approve",
    args: [spenderAddress as AddressType, convertNumberToBigInt(Number(amount), tokenDecimals)]
  });

  const {
    data: approveContractData,
    writeContract: onApprove,
    isPending: isLoadingApproveContract
  } = useWriteContract();

  const { isLoading: waitingApprove, isSuccess: isSuccessWaitingApprove } =
    useWaitForTransactionReceipt({
      hash: approveContractData as AddressType,
      confirmations: ARB_CONFIRMATIONS_COUNT
    });

  const {
    data: approvedAmount,
    refetch: refetchAllowance,
    isLoading
  } = useReadContract({
    address: (tokenAddress as AddressType) || "",
    abi: erc20Abi,
    chainId,
    functionName: "allowance",
    args: [ownerAddress as AddressType, PARASWAP_SPENDER_ADDRESS as AddressType]
  });

  const approvedAmountValue = performApprovedAmountValue(approvedAmount, tokenDecimals);

  useEffect(() => {
    if (isSuccessWaitingApprove) {
      refetchAllowance();
      handlerToast({
        content: "Approval successful",
        type: ToastyTypes.success
      });
    }
  }, [isSuccessWaitingApprove]);

  const handleClick = () => {
    if (onApprove && data?.request) {
      onApprove?.(data.request);
    }
  };

  if (isSuccessWaitingApprove || amount === 0 || approvedAmountValue >= amount) {
    return <></>;
  }

  return (
    <Button
      variant="primaryFilled"
      h="52px"
      w="100%"
      mt={4}
      isLoading={isLoadingApproveContract || waitingApprove || isLoading}
      isDisabled={isDisabled}
      transition="all .3s"
      _hover={{
        opacity: 0.8,
        background: "transparent",
        color: "white"
      }}
      onClick={handleClick}
    >
      {error ? error : "Approve Tokens"}
    </Button>
  );
};

export default ApproveButton;
