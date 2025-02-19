import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";

type VaultPlanDataRowProps = {
  label: string;
  usd: number;
  token: {
    value: number;
    symbol: string;
  };
  isProfit?: boolean;
};

const VaultPlanDataRow: FC<VaultPlanDataRowProps> = ({ label, usd, token, isProfit }) => (
  <Flex flexDir="column" gap={2}>
    <Text fontSize="16px" lineHeight="18px" color="#9FA2A8">
      {label}:
    </Text>

    <Flex gap={2} alignItems="center">
      <Text fontSize="20px" lineHeight="22px" color="black.0">
        {isProfit ? "+" : ""}${usd}
      </Text>

      <Text fontSize="16px" lineHeight="18px" fontWeight={500} color="#9FA2A8">
        ~{token.value} {token.symbol.toUpperCase()}
      </Text>
    </Flex>
  </Flex>
);

export default VaultPlanDataRow;
