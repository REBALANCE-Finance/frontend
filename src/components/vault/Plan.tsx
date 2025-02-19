import { FC } from "react";
import Image from "next/image";
import { Flex, Text } from "@chakra-ui/react";
import VaultPlanPriceRange from "./plan/PriceRange";
import VaultPlanApy from "./plan/Apy";
import VaultPlanDataRow from "./plan/DataRow";
import { VAULT_PLANS } from "@/consts";

type VaultPlanProps = {
  isActive: boolean;
  setIsActive: (value: number) => void;
  id: number;
  title: string;
  range: {
    from: number;
    to: number;
  };
  apy: number;
  initialDeposit: {
    token: number;
    usd: number;
  };
  yearlyProfit: {
    token: number;
    usd: number;
  };
};

const VaultPlan: FC<VaultPlanProps> = ({
  isActive,
  setIsActive,
  id,
  title,
  range,
  apy,
  initialDeposit,
  yearlyProfit
}) => {
  const radioImgUrl = `/assets/icons/${isActive ? "selected" : "unselected"}-plan.svg`;

  return (
    <Flex
      flexDir="column"
      gap={4}
      bg="black.60"
      borderRadius="24px"
      padding={4}
      cursor="pointer"
      minW={290}
      onClick={() => setIsActive(id)}
    >
      <Flex justify="space-between" alignItems="center">
        <Flex gap={4} alignItems="center">
          <Image
            src={radioImgUrl}
            width={22}
            height={22}
            alt="radio"
            style={{
              flexShrink: 0,
              maxHeight: 22,
              maxWidth: 22
            }}
          />
          <VaultPlanPriceRange from={range.from} to={range.to} />
        </Flex>
        <VaultPlanApy value={apy} />
      </Flex>

      <Text fontSize="20px" lineHeight="22px" fontWeight={500} color="black.0">
        {title}
      </Text>

      <Flex flexDir="column" gap={2}>
        <VaultPlanDataRow
          label="Initial deposit"
          usd={initialDeposit.usd}
          token={{
            symbol: "RBLN",
            value: initialDeposit.token
          }}
        />

        <VaultPlanDataRow
          label="Yearly profit"
          usd={yearlyProfit.usd}
          token={{
            symbol: "RBLN",
            value: yearlyProfit.token
          }}
          isProfit
        />
      </Flex>
    </Flex>
  );
};

export default VaultPlan;
