import { OAuthExtension } from "@magic-ext/oauth";
import { dedicatedWalletConnector } from "@magiclabs/wagmi-connector";
import type { Wallet } from "@rainbow-me/rainbowkit";
import type { Chain } from "viem";
import { arbitrum, bsc } from "viem/chains";
import { createConnector } from "wagmi";

export const createMagicConnector = ({ chain }: { chain: Chain }): Wallet => ({
  id: "magic",
  name: "Magic",
  iconUrl: "https://svgshare.com/i/pXA.svg",
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
          providers: ["google", "facebook", "twitter"]
        },
        magicSdkConfiguration: {
          network: {
            chainId: chain.id,
            rpcUrl: chain.rpcUrls.default.http[0]
          },
          extensions: [new OAuthExtension()]
        }
      }
    });

    return createConnector(config => ({
      ...magicConnector(config),
      ...walletDetails
    }));
  }
});

export const magicWallet = (chain: Chain) => createMagicConnector({ chain });
