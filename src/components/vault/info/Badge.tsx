import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";

type VaultInfoBadgeProps = {
  title: string;
};

const VaultInfoBadge: FC<VaultInfoBadgeProps> = ({ title }) => (
  <Flex
    justify="center"
    alignItems="center"
    padding={[0, 2]}
    bg="gray.100"
    borderRadius="50px"
    height={6}
  >
    <Text fontSize="14px" fontWeight={600}>
      {title}
    </Text>
  </Flex>
);

export default VaultInfoBadge;
