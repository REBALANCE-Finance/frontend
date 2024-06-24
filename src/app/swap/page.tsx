"use client";
import { Box, Text } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import Pay from "./components/Pay/Pay";
import Receive from "./components/Receive/Receive";
import Fee from "./components/Fee/Fee";
import { ICON_NAMES } from "@/consts";
import Icon from "@/components/icon";
import { useAccount } from "wagmi";
import { ConnectWallet } from "@/features/ConnectWallet";
import { useState, useEffect, useCallback } from "react";
import { IToken } from "@/api/tokens/types";
import { useGetTokenList } from "@/api/tokens";
import { useGetPrice } from "@/api/swap";
import { formatBigNumber } from "@/utils/formatBigNumber";

const MIN_AMOUNT = 0.01;

const Swap = () => {
  const { address, chainId } = useAccount();
  const [payToken, setPayToken] = useState<IToken | null>(null);
  const [receiveToken, setReceiveToken] = useState<IToken | null>(null);
  const [payAmount, setPayAmount] = useState("0.00");
  const [receiveAmount, setReceiveAmount] = useState("0.00");
  const [error, setError] = useState<string | null>(null);

  const { data: tokenList } = useGetTokenList(chainId);

  useEffect(() => {
    if (tokenList && tokenList.length > 1) {
      setPayToken(tokenList.find(token => token.symbol === "ARB") || tokenList[0]);
      setReceiveToken(tokenList.find(token => token.symbol === "USDT") || tokenList[1]);
    }
  }, [tokenList]);

  const payTokenDecimals = payToken?.decimals ?? 18;
  const receiveTokenDecimals = receiveToken?.decimals ?? 18;

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

  useEffect(() => {
    if (payTokenPriceError || receiveTokenPriceError) {
      setError("No routes found with enough liquidity.");
    } else {
      setError(null);
    }
  }, [payTokenPriceError, receiveTokenPriceError]);

  const payTokenPrice =
    Number(payAmount) > 0 && payTokenPriceData
      ? // @ts-ignore
        Number(payTokenPriceData?.priceRoute?.srcUSD).toFixed(6) || 0
      : 0;
  const receiveTokenPrice =
    Number(receiveAmount) > 0 && receiveTokenPriceData
      ? // @ts-ignore
        Number(receiveTokenPriceData?.priceRoute?.destUSD).toFixed(6) || 0
      : 0;

  const updateReceiveAmount = useCallback(
    (amount: string) => {
      if (payTokenPrice && receiveTokenPrice) {
        const newReceiveAmount = (
          (Number(amount) * Number(payTokenPrice)) /
          Number(receiveTokenPrice)
        ).toFixed(6);
        setReceiveAmount(newReceiveAmount);
      } else {
        setReceiveAmount("0.00");
      }
    },
    [payTokenPrice, receiveTokenPrice]
  );

  const updatePayAmount = useCallback(
    (amount: string) => {
      if (payTokenPrice && receiveTokenPrice) {
        const newPayAmount = (
          (Number(amount) * Number(receiveTokenPrice)) /
          Number(receiveTokenPrice)
        ).toFixed(6);
        setPayAmount(newPayAmount);
      } else {
        setPayAmount("0.00");
      }
    },
    [payTokenPrice, receiveTokenPrice]
  );

  // useEffect(() => {
  //   updateReceiveAmount(payAmount);
  // }, [payAmount, payTokenPrice, receiveTokenPrice]);

  // useEffect(() => {
  //   updatePayAmount(receiveAmount);
  // }, [receiveAmount, payTokenPrice, receiveTokenPrice]);

  if (!address || !chainId)
    return (
      <Box display="flex" m="auto">
        <ConnectWallet />
      </Box>
    );

  const handleSwapTokens = () => {
    const tempToken = payToken;
    const tempAmount = payAmount;
    setPayToken(receiveToken);
    setReceiveToken(tempToken);
    setPayAmount(receiveAmount);
    setReceiveAmount(tempAmount);
  };

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
          setSelected={setPayToken}
          amount={payAmount}
          setAmount={setPayAmount}
          price={payTokenPrice}
          excludeToken={receiveToken}
        />
        <Receive
          selected={receiveToken}
          setSelected={setReceiveToken}
          amount={receiveAmount}
          setAmount={setReceiveAmount}
          price={receiveTokenPrice}
          excludeToken={payToken}
        />
      </Box>
      {error && (
        <Text color="red.500" mt={4} textAlign="center">
          {error}
        </Text>
      )}
      <Fee />
    </Box>
  );
};

export default Swap;
