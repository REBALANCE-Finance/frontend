"use client";
import { useStore } from "@/hooks/useStoreContext";
import { OAuthExtension } from "@magic-ext/oauth";
import { Magic } from "magic-sdk";
import { observer } from "mobx-react-lite";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
import { arbitrum, bsc } from "viem/chains";
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
  const bscActiveChain = activeChain === "BSC";

  useEffect(() => {
    if (magic) {
      setMagic(null);
    }

    if (process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY) {
      // if (magic) {
      //   setMagic(null);
      // }

      const _magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY || "", {
        extensions: [new OAuthExtension()],
        network: {
          rpcUrl: bscActiveChain ? bsc.rpcUrls.default.http[0] : arbitrum.rpcUrls.default.http[0],
          // rpcUrl: arbitrum.rpcUrls.default.http[0],
          // chainId: arbitrum.id
          chainId: bscActiveChain ? bsc.id : arbitrum.id
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
