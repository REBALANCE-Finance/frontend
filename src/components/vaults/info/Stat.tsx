import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { toDollarFormat } from "@/utils";

type VaultInfoStatProps = {
  type: "amount" | "profit";
  title: string;
  value: number;
  coin: "RBLN";
  usdValue: number;
};

const VaultInfoStat: FC<VaultInfoStatProps> = ({ type, title, value, coin, usdValue }) => (
  <Flex flexDir="column" gap={1}>
    <Text fontSize="14px" color="black.5" lineHeight="16px">
      {title}:
    </Text>

    <Text
      fontSize="20px"
      fontWeight={500}
      color={type === "amount" ? "white" : "#4CFF94"}
      lineHeight="22px"
    >
      {type === "profit" && value > 0 ? `+${value} ${coin}` : `${value} ${coin}`}
    </Text>

    <Text fontSize="16px" color="black.5" lineHeight="18px">
      ~{toDollarFormat(usdValue)}
    </Text>
  </Flex>
);

export default VaultInfoStat;
