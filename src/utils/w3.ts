"use client";

import { connectorsForWallets, getDefaultWallets } from "@rainbow-me/rainbowkit";
import {
  walletConnectWallet,
  metaMaskWallet,
  injectedWallet,
  coinbaseWallet
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "@wagmi/core";
import { arbitrum, bsc } from "wagmi/chains";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [injectedWallet, metaMaskWallet, walletConnectWallet, coinbaseWallet]
    }
  ],
  {
    appName: "Rebalance",
    projectId: process?.env?.NEXT_PUBLIC_WALLETCONNECT_KEY || ""
  }
);

export const wagmiConfig = createConfig({
  chains: [arbitrum, bsc],
  connectors: connectors,
  ssr: true,
  transports: {
    [arbitrum.id]: http(),
    [bsc.id]: http()
  }
});
