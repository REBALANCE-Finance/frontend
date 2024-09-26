"use client";
import { Flex } from "@chakra-ui/react";
import { arbitrum, bsc } from "wagmi/chains";
import { AppFooter } from "../widgets/AppFooter";
import { AppHeader } from "../widgets/AppHeader";
import { useEffect } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { observer } from "mobx-react-lite";
import { useStore } from "@/hooks/useStoreContext";

export const MainLayout = observer(({ children }: { children: React.ReactNode }) => {
  // const [client] = useMediaQuery("(display-mode: browser)");
  const { address, chain, isConnected, chainId, isConnecting } = useAccount();
  const { chains, switchChain } = useSwitchChain();
  const { setActiveChain, activeChain } = useStore("poolsStore");

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isConnected && chainId !== arbitrum.id && chainId !== bsc.id) {
      timer = setTimeout(() => {
        switchChain({
          chainId: activeChain === "Arbitrum" ? arbitrum.id : bsc.id
        });
      }, 500);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isConnected, chainId]);

  useEffect(() => {
    if (isConnected && (chainId === arbitrum.id || chainId === bsc.id)) {
      const chainName = chainId === bsc.id ? "BSC" : "Arbitrum";
      setActiveChain(chainName);
    }
  }, [chainId, isConnected]);

  // if (!client) return null;
  return (
    <Flex direction="column" minH="100vh" alignItems="center" w="100%">
      <AppHeader />
      {/* <AppWarning /> */}
      {/* TODO: Bring back when be ready */}
      {/* <Tutorial /> */}
      <Flex flex="1 0" w="100%">
        {children}
      </Flex>
      <AppFooter />
    </Flex>
  );
});
