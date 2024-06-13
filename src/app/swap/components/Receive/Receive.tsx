"use client";

import { Box, Text } from "@chakra-ui/react";
import Select from "../ui/Select";
import AmountInput from "../ui/AmountInput";
import { useEffect, useMemo } from "react";
import { useAccount, useReadContracts } from "wagmi";
import { useGetTokenList } from "@/api/tokens";
import { IToken } from "@/api/tokens/types";
import { ABI_REBALANCE } from "@/abi/rebalance";
import { formatUnits } from "ethers";

const contracts = (tokens: IToken[], address: `0x${string}` | undefined) => {
  return tokens?.map((token) => ({
    address: token.address as `0x${string}`,
    abi: ABI_REBALANCE,
    functionName: "balanceOf",
    args: [address]
  }));
};

const Receive = ({ selected, setSelected, amount, setAmount, price, excludeToken } : any) => {
  const { address, chainId } = useAccount();
  const tokenListQuery = useGetTokenList(chainId || 42161);

  const contractsData = useReadContracts({
    contracts: contracts(tokenListQuery.data || [], address),
  });

  const tokensInMyWallet = useMemo(() => {
    if (!contractsData.data || !tokenListQuery.data) return [];
    return tokenListQuery.data
      .map((token, i) => ({
        ...token,
        value: formatUnits(contractsData.data[i].result as bigint, token.decimals),
      }))
      .filter((token) => Number(token.value) > 0);
  }, [contractsData.data, tokenListQuery.data]);

  const availableTokens = useMemo(() => {
    if (!tokenListQuery.data) return [];
    const tokensInWalletSymbols = new Set(tokensInMyWallet.map(token => token.symbol));
    const filteredTokens = tokenListQuery.data.filter(token => !tokensInWalletSymbols.has(token.symbol));
    if (excludeToken) {
      return filteredTokens.filter(token => token.symbol !== excludeToken.symbol);
    }
    return filteredTokens;
  }, [tokenListQuery.data, tokensInMyWallet, excludeToken]);

  useEffect(() => {
    if (availableTokens.length > 0 && (!selected || !availableTokens.find(token => token.symbol === selected?.symbol))) {
      setSelected(availableTokens[0]);
    }
  }, [availableTokens]);

  const selectedTokenBalance = useMemo(() => {
    const token = tokensInMyWallet.find(token => token.symbol === selected?.symbol);
    return token ? Number(token.value).toFixed(6) : "0.000000";
  }, [tokensInMyWallet, selected]);

  return (
    <Box
      background="#09090B"
      p="20px 24px"
      borderRadius="4px"
      mt="12px">
      <Text color="gray">You receive</Text>
      <Box
        mt="12px"
        display="flex"
        alignItems="center"
        justifyContent="space-between">
        <Select options={availableTokens} value={selected} setSelected={setSelected} />
        <AmountInput
          amount={amount}
          setAmount={setAmount}
          maxAmount={Number(selectedTokenBalance)}
        />
      </Box>

      <Box
        mt="12px"
        display="flex"
        alignItems="center"
        justifyContent="space-between">
        <Text>Balance: {selectedTokenBalance || "0"}</Text>
        <Text textStyle="textMono16" color="white">${price}</Text>
      </Box>
    </Box>
  );
};

export default Receive;
