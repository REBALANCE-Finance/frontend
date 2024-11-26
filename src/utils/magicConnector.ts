import { dedicatedWalletConnector } from "@magiclabs/wagmi-connector";
import type { Wallet } from "@rainbow-me/rainbowkit";
import { arbitrum, bsc } from "viem/chains";
import { createConnector } from "wagmi";

export const magicConnector: Wallet = {
  id: "magic",
  name: "Magic",
  iconUrl: "/assets/image/Magic.svg",
  iconBackground: "#fff",
  installed: true,
  iconAccent: "#b4acfc",

  createConnector: walletDetails => {
    const magicConnector = dedicatedWalletConnector({
      chains: [bsc, arbitrum],
      options: {
        customLogo: "https://app.rebalance.finance/assets/logo/logo-short.svg",
        apiKey: process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string,
        accentColor: "rgba(76, 255, 148, 0.4)",
        isDarkMode: true,
        oauthOptions: {
          providers: ["google", "twitter"]
        },
        magicSdkConfiguration: {
          network: {
            chainId: arbitrum.id,
            rpcUrl: arbitrum.rpcUrls.default.http[0]
          }
        }
      }
    });

    return createConnector(config => ({
      ...magicConnector(config),
      ...walletDetails
    }));
  }
};

export const magicWallet = () => magicConnector;
