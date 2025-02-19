import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";

type VaultInfoDataRowProps = {
  title: string;
  value: string;
};

const VaultInfoDataRow: FC<VaultInfoDataRowProps> = ({ title, value }) => (
  <Flex gap={3} alignItems="center">
    <Text fontSize="14px" color="black.5" lineHeight="16px">
      {title}:
    </Text>

    <Text fontSize="14px" color="black.0" lineHeight="16px" fontWeight={500}>
      {value}
    </Text>
  </Flex>
);

export default VaultInfoDataRow;
