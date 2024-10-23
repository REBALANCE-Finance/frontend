"use client";

import { connectorsForWallets, getDefaultWallets } from "@rainbow-me/rainbowkit";
import {
  walletConnectWallet,
  metaMaskWallet,
  injectedWallet,
  coinbaseWallet
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "@wagmi/core";
import { arbitrum, bsc, Chain } from "wagmi/chains";
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

export const createWagmiConfig = (chain: Chain) => {
  return createConfig({
    chains: [arbitrum, bsc],
    connectors: createConnectors(chain),
    ssr: true,
    transports: {
      [arbitrum.id]: http(),
      [bsc.id]: http()
    }
  });
};
