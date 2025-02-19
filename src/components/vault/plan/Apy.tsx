import { FC } from "react";
import { Text } from "@chakra-ui/react";

type VaultPlanApyProps = {
  value: number;
};

const VaultPlanApy: FC<VaultPlanApyProps> = ({ value }) => (
  <Text fontSize="20px" lineHeight="22px" fontWeight={600} color="#4CFF94">
    {value}% APY
  </Text>
);

export default VaultPlanApy;
