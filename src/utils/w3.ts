'use client'

import { createConfig, http } from "@wagmi/core";
import { arbitrum, bsc, optimism } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";


const connectors = [
  injected({ target: "metaMask" }),
  coinbaseWallet({ appName: "Rebalance" }),
  walletConnect({ projectId: process?.env?.VITE_WALLETCONNECT_KEY || '' })
];


export const wagmiConfig = createConfig({
  chains: [arbitrum, bsc, optimism],
  connectors,
  transports: {
    // [sepolia.id]: http(),
    [arbitrum.id]: http(),
    [bsc.id]: http(),
    [optimism.id]: http()
  }
});
