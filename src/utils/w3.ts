"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  walletConnectWallet,
  metaMaskWallet,
  injectedWallet,
  coinbaseWallet
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "@wagmi/core";
import { arbitrum, bsc, Chain } from "wagmi/chains";
import { magicWallet } from "./magicConnector";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Popular",
      wallets: [injectedWallet, metaMaskWallet, walletConnectWallet, coinbaseWallet, magicWallet]
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
