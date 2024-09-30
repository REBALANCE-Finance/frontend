"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { CacheProvider } from "@chakra-ui/next-js";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { themes } from "../themes";
import { wagmiConfig } from "../utils/w3";
import { bsc } from "viem/chains";
import { RAINBOW_THEME } from "@/consts";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={themes}>
        <WagmiProvider config={wagmiConfig}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider
              modalSize="compact"
              initialChain={bsc}
              theme={RAINBOW_THEME}
              locale="en-US"
              appInfo={{
                appName: "NOTAI"
              }}
            >
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
