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

const Pay = ({ selected, setSelected, amount, setAmount, price, excludeToken }: any) => {
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
        value: contractsData.data[i]?.result
          ? formatUnits(contractsData.data[i].result as bigint, token.decimals)
          : "0",
      }))
      .filter((token) => Number(token.value) > 0);
  }, [contractsData.data, tokenListQuery.data]);

  const allTokensSorted = useMemo(() => {
    if (!tokenListQuery.data) return [];
    const tokensWithBalance = tokensInMyWallet.map(t => t.symbol);
    const sortedTokens = [
      ...tokensInMyWallet,
      ...tokenListQuery.data.filter(token => !tokensWithBalance.includes(token.symbol))
    ];
    if (excludeToken) {
      return sortedTokens.filter(token => token.symbol !== excludeToken.symbol);
    }
    return sortedTokens;
  }, [tokenListQuery.data, tokensInMyWallet, excludeToken]);

  useEffect(() => {
    if (allTokensSorted.length > 0 && (!selected || !allTokensSorted.find(token => token.symbol === selected.symbol))) {
      setSelected(allTokensSorted[0]);
    }
  }, [allTokensSorted]);

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
      <Text color="gray">You pay</Text>
      <Box
        mt="12px"
        display="flex"
        alignItems="center"
        justifyContent="space-between">
        <Select options={allTokensSorted} value={selected} setSelected={setSelected} />
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

export default Pay;
