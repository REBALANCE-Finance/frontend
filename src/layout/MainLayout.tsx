"use client";
"use client";

import { Flex, useMediaQuery } from "@chakra-ui/react";
import { arbitrum } from "wagmi/chains";
import { AppFooter } from "../widgets/AppFooter";
import { AppHeader } from "../widgets/AppHeader";
import { AppWarning } from "../widgets/AppWarning";
import { useEffect } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import Tutorial from "@/features/Tutorial";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // const [client] = useMediaQuery("(display-mode: browser)");
  const { address, chain } = useAccount();
  const { chains, switchChain } = useSwitchChain();

  useEffect(() => {
    if (address && chain?.id !== arbitrum.id && switchChain) {
      switchChain({
        chainId: arbitrum.id
      });
    }
  }, [address, chain?.id, switchChain]);

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
};
