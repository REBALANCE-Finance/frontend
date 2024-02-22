import { Flex } from "@chakra-ui/react";
import { RebalancePerformance } from "../../feature/RebalancePerformance";

export const Lending = () => {
  return (
    <Flex direction="column" w="100%" px={{ base: "16px", xxl: "0" }}>
      <RebalancePerformance />
    </Flex>
  );
};
