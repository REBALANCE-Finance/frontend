import { Flex } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type VaultsLayoutProps = {
  children: ReactNode;
};

const VaultsLayout: FC<VaultsLayoutProps> = ({ children }) => {
  return (
    <Flex direction="column" w="100%" align="center">
      <Flex
        direction="column"
        maxW="1300px"
        w="100%"
        p={{ base: "0 16px 16px", xl: 0 }}
        justify="center"
      >
        {children}
      </Flex>
    </Flex>
  );
};

export default VaultsLayout;
