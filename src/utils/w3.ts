import { createConfig, http } from "@wagmi/core";
import { arbitrum, bsc, optimism, sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [sepolia, arbitrum, bsc, optimism],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Rebalance" }),
    walletConnect({ projectId: import.meta.env.VITE_WALLETCONNECT_KEY })
  ],
  transports: {
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
    [bsc.id]: http(),
    [optimism.id]: http()
  }
});
