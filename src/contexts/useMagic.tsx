"use client";
import { useStore } from "@/hooks/useStoreContext";
import { OAuthExtension } from "@magic-ext/oauth";
import { Magic } from "magic-sdk";
import { observer } from "mobx-react-lite";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { arbitrum, base, bsc } from "viem/chains";
import { useAccount } from "wagmi";

type MagicContextType = {
  magic: Magic | null;
};

const MagicContext = createContext<MagicContextType>({
  magic: null
});

export const useMagic = () => useContext(MagicContext);

const MagicProvider = observer(({ children }: { children: ReactNode }) => {
  const [magic, setMagic] = useState<any>();
  const { activeChain } = useStore("poolsStore");

  // Helper functions to get network configuration
  const getRpcUrl = (chain: string): string => {
    switch (chain) {
      case "BSC":
        return bsc.rpcUrls.default.http[0];
      case "Base":
        return base.rpcUrls.default.http[0];
      case "Arbitrum":
      default:
        return arbitrum.rpcUrls.default.http[0];
    }
  };

  const getChainId = (chain: string): number => {
    switch (chain) {
      case "BSC":
        return bsc.id;
      case "Base":
        return base.id;
      case "Arbitrum":
      default:
        return arbitrum.id;
    }
  };

  useEffect(() => {
    if (magic) {
      setMagic(null);
    }

    if (process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY) {
      const _magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || "", {
        extensions: [new OAuthExtension()],
        network: {
          rpcUrl: getRpcUrl(activeChain),
          chainId: getChainId(activeChain)
        }
      });

      setMagic(_magic);
    } else {
      console.error("NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY is not set");
    }
  }, [activeChain]);

  const value = useMemo(() => {
    return {
      magic
    };
  }, [magic]);

  return <MagicContext.Provider value={value}>{children}</MagicContext.Provider>;
});

export default MagicProvider;
