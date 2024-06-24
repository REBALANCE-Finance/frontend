"use client";
import { Box } from "@chakra-ui/react";
import Header from "./components/Header/Header";
import Pay from "./components/Pay/Pay";
import Receive from "./components/Receive/Receive";
import Fee from "./components/Fee/Fee";
import { ICON_NAMES } from "@/consts";
import Icon from "@/components/icon";
import { useAccount } from "wagmi";
import { ConnectWallet } from "@/features/ConnectWallet";
import { useState, useEffect } from "react";
import { IToken } from "@/api/tokens/types";
import { useGetTokenList } from "@/api/tokens";
import { useGetPrice } from "@/api/swap";

const Swap = () => {
  const { address, chainId } = useAccount();
  const [payToken, setPayToken] = useState<IToken | null>(null);
  const [receiveToken, setReceiveToken] = useState<IToken | null>(null);
  const [payAmount, setPayAmount] = useState("0.00");
  const [receiveAmount, setReceiveAmount] = useState("0.00");

  const { data: tokenList } = useGetTokenList(chainId);

  useEffect(() => {
    if (tokenList && tokenList.length > 1) {
      setPayToken(tokenList[0]);
      setReceiveToken(tokenList[1]);
    }
  }, [tokenList]);

  const { data: payTokenPriceData } = useGetPrice(payToken?.address, 1, 1);
  const { data: receiveTokenPriceData } = useGetPrice(receiveToken?.address, 1, 1);

  const payTokenPrice = payTokenPriceData?.prices[0][1] || null;
  const receiveTokenPrice = receiveTokenPriceData?.prices[0][1] || null;

  const updateReceiveAmount = (amount: string) => {
    if (payTokenPrice && receiveTokenPrice) {
      const newReceiveAmount = (Number(amount) * payTokenPrice / receiveTokenPrice).toFixed(6);
      setReceiveAmount(newReceiveAmount);
    }
  };

  const updatePayAmount = (amount: string) => {
    if (payTokenPrice && receiveTokenPrice) {
      const newPayAmount = (Number(amount) * receiveTokenPrice / payTokenPrice).toFixed(6);
      setPayAmount(newPayAmount);
    }
  };

  useEffect(() => {
    updateReceiveAmount(payAmount);
  }, [payAmount, payTokenPrice, receiveTokenPrice]);

  useEffect(() => {
    updatePayAmount(receiveAmount);
  }, [receiveAmount, payTokenPrice, receiveTokenPrice]);

  if (!address || !chainId) return <Box display="flex" m="auto"><ConnectWallet /></Box>;

  const handleSwapTokens = () => {
    const tempToken = payToken;
    const tempAmount = payAmount;
    setPayToken(receiveToken);
    setReceiveToken(tempToken);
    setPayAmount(receiveAmount);
    setReceiveAmount(tempAmount);
  };

  return (
    <Box
      borderRadius="4px"
      w="540px"
      m="60px auto auto"
      background="#151619"
      p="24px 20px">
      <Header />
      <Box position="relative">
        <Box
          cursor="pointer"
          border="6px solid #151619"
          borderRadius="8px"
          padding="4px"
          position="absolute"
          top="50%" left="50%" transform="translate(-50%, -50%)"
          onClick={handleSwapTokens}>
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
      <Fee />
    </Box>
  );
};

export default Swap;
