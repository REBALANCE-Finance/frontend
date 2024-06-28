import { Button, Flex, Link, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { parseEther } from "viem";
import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { getParaswapSwapTransaction } from "@/api/swap";
import { AddressType } from "@/types";
import { ARB_CONFIRMATIONS_COUNT } from "@/consts";
import { handlerToast } from "../toasty/utils";
import { ToastyTypes } from "../toasty/types";
import { defChainIdArbitrum } from "@/hooks/useAuth";
import { getExplorerTxLink } from "@/utils";

type SwapButtonProps = {
  payToken: {
    address: AddressType;
    decimals: number;
    amount: number;
  };
  receiveToken: {
    address: AddressType;
    decimals: number;
  };
  isDisabled: boolean;
  onError: (error: string) => void;
  onSuccess: (value: boolean) => void;
};

const SwapButton = ({
  payToken,
  receiveToken,
  isDisabled,
  onError,
  onSuccess
}: SwapButtonProps) => {
  const [txHash, setTxHash] = useState("");
  const { isIdle, isPending, sendTransactionAsync, data: hash } = useSendTransaction();
  const { data, isSuccess, isError, error, isLoading } = useWaitForTransactionReceipt({
    hash: txHash as AddressType,
    confirmations: ARB_CONFIRMATIONS_COUNT
  });
  const { chainId, address: userAddress } = useAccount();

  useEffect(() => {
    if (isSuccess && txHash) {
      onSuccess(true);
      handlerToast({
        content: (
          <Flex flexDir="column" gap={1}>
            <Text fontSize="20px">Swap successful</Text>
            <Link
              href={getExplorerTxLink(txHash)}
              target="_blank"
              color="greenAlpha.100"
              fontSize="14px"
              textDecoration="underline"
            >
              View on Arbiscan
            </Link>
          </Flex>
        ),
        type: ToastyTypes.success
      });
    } else if (isError) {
      onError(error.message);
    }
  }, [isSuccess, isError, error, onSuccess, onError, txHash]);

  const handleSwap = async () => {
    onError("");

    try {
      const transactionData = await getParaswapSwapTransaction(
        payToken.address,
        receiveToken.address,
        Number(payToken.amount),
        chainId || defChainIdArbitrum,
        payToken.decimals || 18,
        receiveToken.decimals || 18,
        userAddress as string
      );

      const txResponse = await sendTransactionAsync({
        to: transactionData.to,
        data: transactionData.data,
        value: parseEther(transactionData.value)
      });

      if (txResponse) {
        setTxHash(txResponse);
      }
    } catch (err: any) {
      onError(err.message);
    }
  };

  return (
    <Button
      variant="primaryFilled"
      onClick={handleSwap}
      isLoading={isPending || isLoading}
      isDisabled={isDisabled}
      w="100%"
      h="52px"
      mt={4}
      transition="all .3s"
      sx={{
        "&:hover": {
          opacity: 0.8,
          background: "transparent",
          color: "white"
        }
      }}
    >
      Swap
    </Button>
  );
};

export default SwapButton;
