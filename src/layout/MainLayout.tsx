"use client";

import { Flex, useMediaQuery } from "@chakra-ui/react";

import { AppFooter } from "../widgets/AppFooter";
import { AppHeader } from "../widgets/AppHeader";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  // const [client] = useMediaQuery('(display-mode: browser)');
  // if (!client) return null;
  return (
    <Flex direction="column" minH="100vh" alignItems="center" w="100%">
      <AppHeader />
      {/* <AppWarning /> */}
      <Flex flex="1 0" w="100%">
        {children}
      </Flex>
      <AppFooter />
    </Flex>
  );
};
