import { transformNumberThousands } from "@/utils";
import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

type VaultPlanPriceRangeProps = {
  from: number;
  to: number;
};

const VaultPlanPriceRange: FC<VaultPlanPriceRangeProps> = ({ from, to }) => (
  <Box w="max-content" padding={[1, 2]} bg="gray.100" borderRadius="50px">
    <Text fontSize="14px" lineHeight="16px" fontWeight={600}>
      ${transformNumberThousands(from)} - ${transformNumberThousands(to)}
    </Text>
  </Box>
);

export default VaultPlanPriceRange;
