"use client";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  walletConnectWallet,
  metaMaskWallet,
  injectedWallet,
  coinbaseWallet
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "@wagmi/core";
import { arbitrum, bsc, Chain, base } from "wagmi/chains";
import { magicWallet } from "./magicConnector";

const createConnectors = (chain: Chain) => {
  return connectorsForWallets(
    [
      {
        groupName: "Popular",
        wallets: [
          injectedWallet,
          metaMaskWallet,
          walletConnectWallet,
          coinbaseWallet,
          () => magicWallet(chain)
        ]
      }
    ],
    {
      appName: "Rebalance",
      projectId: process?.env?.NEXT_PUBLIC_WALLETCONNECT_KEY || ""
    }
  );
};

export const wagmiConfig = createConfig({
  chains: [arbitrum, bsc, base],
  connectors: createConnectors(arbitrum),
  ssr: true,
  syncConnectedChain: true,
  transports: {
    [arbitrum.id]: http(),
    [bsc.id]: http("https://bsc-pokt.nodies.app"),
    [base.id]: http()
  }
});
