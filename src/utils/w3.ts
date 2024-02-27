import { createConfig, http } from "@wagmi/core";
import { sepolia } from "wagmi/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    coinbaseWallet({ appName: "Rebalance" }),
    walletConnect({ projectId: import.meta.env.VITE_WALLETCONNECT_KEY })
  ],
  transports: {
    [sepolia.id]: http()
  }
});
