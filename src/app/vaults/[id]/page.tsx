"use client";
import VaultDetails from "@/components/vault";
import { useStore } from "@/hooks/useStoreContext";
import VaultsLayout from "@/layout/VaultsLayout";
import { ModalEnum } from "@/store/modal/types";
import { useState } from "react";
import { useAccount } from "wagmi";

const VaultPage = () => {
  const { address } = useAccount();
  const { openModal } = useStore("modalStore");
  const [step, setStep] = useState<"details" | "form">("details");

  const onOpenForm = () => {
    openModal({
      type: ModalEnum.Vault
    });
  };

  return (
    <VaultsLayout>
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
    </VaultsLayout>
  );
};

export default VaultPage;
