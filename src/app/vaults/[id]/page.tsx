"use client";
import VaultDetails from "@/components/vault";
import VaultForm from "@/components/vault/form";
import { useStore } from "@/hooks/useStoreContext";
import VaultsLayout from "@/layout/VaultsLayout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAccount } from "wagmi";

const VaultPage = () => {
  const { push } = useRouter();
  const { address } = useAccount();
  const { openModal } = useStore("modalStore");
  const [step, setStep] = useState<"details" | "form">("details");

  const onCloseForm = () => {
    setStep("details");
  };

  const onOpenForm = () => {
    setStep("form");
  };

  const renderStep = () => {
    switch (step) {
      case "details":
        return (
          <VaultDetails
            imageUrl="/assets/image/vault.png"
            title="TERMINUS Vault"
            btnTitle="Activate Terminus"
            description={{
              title: "Why Terminus?",
              list: [
                "Access to high-yield strategies backed by a professional hedge fund.",
                "Gain steady RBLN token emissions simply by holding a Terminus — no extra steps required.",
                "Boost earnings through our referral rewards of up to 50% of your referees’ profits."
              ]
            }}
            onOpenForm={onOpenForm}
          />
        );

      case "form":
        return (
          <VaultForm
            title="Activate Terminus"
            onClose={onCloseForm}
            startAmount={{
              token: 350,
              usd: 100
            }}
            projectedProfit={{
              token: 545,
              usd: 191
            }}
            apy={155.9}
          />
        );
    }
  };

  return <VaultsLayout>{renderStep()}</VaultsLayout>;
};

export default VaultPage;
