import { FC } from "react";
import { Badge, Flex, Text } from "@chakra-ui/react";
import { IVaultInfo } from "@/types";
import VaultInfoBadge from "./Badge";
import VaultInfoDataRow from "./DataRow";
import VaultInfoStat from "./Stat";
import VaultInfoProgress from "./Progress";

type VaultInfoProps = IVaultInfo;

const VaultInfo: FC<VaultInfoProps> = ({
  title,
  tier,
  validDate,
  apy,
  initialAmount,
  currentProfit,
  referralProfit,
  progress
}) => {
  return (
    <Flex flexDir="column" gap={6}>
      <Flex justify="space-between" alignItems="center" gap={4}>
        <Flex gap={4} alignItems="center">
          <Text fontFamily="dmSans" fontSize="30px" fontWeight={500}>
            {title}
          </Text>

          <VaultInfoBadge title={tier} />
        </Flex>

        <Flex flexDir="column" gap={2} alignItems="flex-end">
          <VaultInfoDataRow title="Valid" value={validDate} />
          <VaultInfoDataRow title="APY" value={apy} />
        </Flex>
      </Flex>

      <Flex gap={4} justify="space-between">
        <VaultInfoStat
          title="Initial amount"
          coin="RBLN"
          type="amount"
          value={initialAmount.token}
          usdValue={initialAmount.usd}
        />

        <VaultInfoStat
          title="Current profit"
          coin="RBLN"
          type="profit"
          value={currentProfit.token}
          usdValue={currentProfit.usd}
        />

        <VaultInfoStat
          title="Referral profit"
          coin="RBLN"
          type="profit"
          value={referralProfit.token}
          usdValue={referralProfit.usd}
        />
      </Flex>

      <VaultInfoProgress now={progress.now} total={progress.total} />
    </Flex>
  );
};

export default VaultInfo;
