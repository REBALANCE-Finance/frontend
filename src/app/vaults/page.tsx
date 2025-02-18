import Vault from "@/components/vault";
import VaultsLayout from "@/layout/VaultsLayout";

const VaultsPage = () => {
  const onAddMore = () => {};

  return (
    <VaultsLayout>
      <Vault
        imageUrl="/assets/image/vault.png"
        referralLink="https://ref.rebalance.finance?harry-seldon-kol"
        info={{
          title: "Terminus 1",
          tier: "Tier 1",
          validDate: "Mar 01, 2025 — Mar 01, 2026",
          apy: "155.9%",
          initialAmount: {
            token: 350,
            usd: 100
          },
          currentProfit: {
            token: 545,
            usd: 151.75
          },
          referralProfit: {
            token: 0,
            usd: 0
          },
          progress: {
            now: 225,
            total: 350
          }
        }}
        onAddMore={onAddMore}
      />
    </VaultsLayout>
  );
};

export default VaultsPage;
