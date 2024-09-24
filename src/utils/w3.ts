"use client";

import { createConfig, http } from "@wagmi/core";
import { arbitrum, bsc, optimism } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect, metaMask } from "wagmi/connectors";

const connectors = [
  injected({ target: "metaMask" }),
  metaMask(),
  coinbaseWallet({ appName: "Rebalance" }),
  walletConnect({ projectId: process?.env?.NEXT_PUBLIC_WALLETCONNECT_KEY || "" })
];

export const wagmiConfig = createConfig({
  chains: [arbitrum, bsc],
  connectors,
  // ssr: true,
  transports: {
    // [sepolia.id]: http(),
    [arbitrum.id]: http(),
    [bsc.id]: http()
  }
});
