'use client'

import { Flex } from "@chakra-ui/react";

import { AppFooter } from "../widgets/AppFooter";
import { AppHeader } from "../widgets/AppHeader";
import { AppWarning } from "../widgets/AppWarning";

export const MainLayout = ({ 
  children 
} : {
  children: React.ReactNode;
}) => {
  return (
    <Flex direction="column" minH="100vh" alignItems="center" w="100%">
      <AppHeader />
      <AppWarning />
      <Flex flex="1 0" w="100%">
        {children}
      </Flex>
      <AppFooter />
    </Flex>
  );
};
