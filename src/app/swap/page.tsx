"use client";
import { Box, Button, Text } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import Pay from "./components/Pay/Pay";
import Receive from "./components/Receive/Receive";
import Fee from "./components/Fee/Fee";
import { ICON_NAMES, PARASWAP_SPENDER_ADDRESS } from "@/consts";
import Icon from "@/components/icon";
import { useAccount, useEstimateGas, useReadContract } from "wagmi";
import { ConnectWallet } from "@/features/ConnectWallet";
import { useState, useEffect } from "react";
import { IToken } from "@/api/tokens/types";
import { useGetTokenList } from "@/api/tokens";
import { useGetPrice } from "@/api/swap";
import { formatBigNumber } from "@/utils/formatBigNumber";
import { erc20Abi } from "viem";
import ApproveButton from "@/components/button/ApproveButton";
import { performApprovedAmountValue } from "@/utils";
import SwapButton from "@/components/button/SwapButton";
import { AddressType } from "@/types";
import { getApiError } from "@/utils/handlers";

const Swap = () => {
  const { address, chainId, connector } = useAccount();
  const [payToken, setPayToken] = useState<IToken | null>(null);
  const [receiveToken, setReceiveToken] = useState<IToken | null>(null);
  const [payAmount, setPayAmount] = useState("1.00");
  const [receiveAmount, setReceiveAmount] = useState("0.00");
  const [error, setError] = useState<string | null>(null);
  const [isSuccessSwap, setIsSuccessSwap] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<string>("");
  const [gasFee, setGasFee] = useState<string>("");

  const { data: tokenList } = useGetTokenList(chainId);

  const payTokenDecimals = payToken?.decimals ?? 18;
  const receiveTokenDecimals = receiveToken?.decimals ?? 18;

  const { data: approvedAmount, refetch: refetchAllowance } = useReadContract({
    address: (payToken?.address as `0x${string}`) || "",
    abi: erc20Abi,
    chainId,
    functionName: "allowance",
    args: [address as `0x${string}`, PARASWAP_SPENDER_ADDRESS as `0x${string}`],
    query: {
      enabled: payAmount !== "0.00"
    }
  });

  const approvedAmountValue = performApprovedAmountValue(approvedAmount, payTokenDecimals);

  const { data: payTokenPriceData, error: payTokenPriceError } = useGetPrice(
    payToken?.address,
    receiveToken?.address,
    Number(payAmount),
    chainId ?? 1,
    payTokenDecimals,
    receiveTokenDecimals
  );

  const { data: receiveTokenPriceData, error: receiveTokenPriceError } = useGetPrice(
    receiveToken?.address,
    payToken?.address,
    Number(receiveAmount),
    chainId ?? 1,
    receiveTokenDecimals,
    payTokenDecimals
  );

  useEffect(() => {
    if (tokenList && tokenList.length > 1 && !payToken && !receiveToken) {
      setPayToken(tokenList.find(token => token.symbol === "ARB") || tokenList[0]);
      setReceiveToken(tokenList.find(token => token.symbol === "USDT") || tokenList[1]);
    }
  }, [tokenList, payToken, receiveToken]);

  useEffect(() => {
    if (payTokenPriceData) {
      // @ts-ignore
      const srcAmount = BigInt(payTokenPriceData.priceRoute.srcAmount);
      // @ts-ignore
      const destAmount = BigInt(payTokenPriceData.priceRoute.destAmount);
      const rate =
        (Number(destAmount) * 10 ** payTokenDecimals) /
        (Number(srcAmount) * 10 ** receiveTokenDecimals);
      setExchangeRate(`1 ${payToken?.symbol} = ${rate.toFixed(6)} ${receiveToken?.symbol}`);
      // @ts-ignore
      const gasCostInWei = BigInt(payTokenPriceData.priceRoute.gasCost);
      const gasCostInEth = Number(gasCostInWei) / 1e18;
      setGasFee(
        gasCostInEth > 0 && gasCostInEth < 0.000001
          ? "<0.000001 ETH"
          : `${gasCostInEth.toFixed(6)} ETH`
      );
    }
  }, [payTokenPriceData, payToken, receiveToken, payTokenDecimals, receiveTokenDecimals]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isSuccessSwap) {
      handleResetInputs();
      timer = setTimeout(() => {
        setIsSuccessSwap(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccessSwap]);

  useEffect(() => {
    const newError = payTokenPriceError || receiveTokenPriceError;
    if (newError) {
      setError(getApiError(newError));
    } else if (!newError && error) {
      setError(null);
    }
  }, [payTokenPriceError, receiveTokenPriceError]);

  useEffect(() => {
    if (payTokenPriceData) {
      setReceiveAmount(
        formatBigNumber(
          // @ts-ignore
          BigInt(payTokenPriceData.priceRoute.destAmount),
          // @ts-ignore
          payTokenPriceData.priceRoute.destDecimals
        )
      );
    }
  }, [payTokenPriceData]);

  const payTokenPrice =
    Number(payAmount) > 0 && payTokenPriceData
      ? // @ts-ignore
        Number(payTokenPriceData?.priceRoute?.srcUSD).toFixed(6) || 0
      : 0;

  const receiveTokenPrice =
    Number(receiveAmount) > 0 && receiveTokenPriceData
      ? // @ts-ignore
        Number(receiveTokenPriceData?.priceRoute?.destUSD).toFixed(6)
      : 0;

  const handlePayInputChange = (value: string) => {
    setError("");
    setPayAmount(value);
  };

  const handleReceiveInputChange = (value: string) => {
    setError("");
    setReceiveAmount(value);
    setGasFee("");
    setExchangeRate("");
  };

  const handleSelectPayToken = (token: IToken) => {
    setPayToken(token);
    setPayAmount("1.00");
    setReceiveAmount("0.00");
    setGasFee("");
    setExchangeRate("");
  };

  const handleSelectReceiveToken = (token: IToken) => {
    setReceiveToken(token);
    setPayAmount("1.00");
    setReceiveAmount("0.00");
    setGasFee("");
    setExchangeRate("");
  };

  const handleSwapTokens = () => {
    const tempToken = payToken;
    const tempAmount = payAmount;
    setPayToken(receiveToken);
    setReceiveToken(tempToken);
    setPayAmount(receiveAmount);
    setReceiveAmount(tempAmount);
    setGasFee("");
    setExchangeRate("");
  };

  const handleResetInputs = () => {
    setPayAmount("0.00");
    setReceiveAmount("0.00");
  };

  if (!address || !chainId)
    return (
      <Box display="flex" m="auto">
        <ConnectWallet />
      </Box>
    );

  const isNeedApprove = Number(payAmount) > approvedAmountValue;
  const isSwapDisabled = isNeedApprove;
  const isLoadingFee = !gasFee || !exchangeRate;

  return (
    <Box borderRadius="4px" w="540px" m="60px auto auto" background="#151619" p="24px 20px">
      <Header />
      <Box position="relative">
        <Box
          cursor="pointer"
          border="6px solid #151619"
          borderRadius="8px"
          padding="4px"
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          onClick={handleSwapTokens}
        >
          <Icon name={ICON_NAMES.swap} />
        </Box>
        <Pay
          selected={payToken}
          setSelected={handleSelectPayToken}
          amount={payAmount}
          setAmount={handlePayInputChange}
          price={payTokenPrice}
          excludeToken={receiveToken}
          isSuccessSwap={isSuccessSwap}
        />
        <Receive
          selected={receiveToken}
          setSelected={handleSelectReceiveToken}
          amount={receiveAmount}
          setAmount={handleReceiveInputChange}
          price={receiveTokenPrice}
          excludeToken={payToken}
          isSuccessSwap={isSuccessSwap}
        />
      </Box>
      {error && (
        <Text color="red.500" mt={4} textAlign="center">
          {error}
        </Text>
      )}
      <Fee exchangeRate={exchangeRate} gasFee={gasFee} isLoading={isLoadingFee} />
      <ApproveButton
        amount={Number(payAmount)}
        ownerAddress={address}
        spenderAddress={PARASWAP_SPENDER_ADDRESS}
        tokenAddress={payToken?.address || ""}
        tokenDecimals={payTokenDecimals}
        isDisabled={!payTokenPriceData || !receiveTokenPriceData}
      />
      <SwapButton
        payToken={{
          address: (payToken?.address as AddressType) || ("" as AddressType),
          amount: Number(payAmount),
          decimals: payTokenDecimals
        }}
        receiveToken={{
          address: (receiveToken?.address as AddressType) || ("" as AddressType),
          decimals: receiveTokenDecimals
        }}
        isDisabled={isSwapDisabled || !payTokenPriceData || !receiveTokenPriceData}
        onError={setError}
        onSuccess={setIsSuccessSwap}
      />
    </Box>
  );
};

export default Swap;
