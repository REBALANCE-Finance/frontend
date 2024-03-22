import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { AppFooter } from "../widgets/AppFooter";
import { AppHeader } from "../widgets/AppHeader";
import { AppWarning } from "../widgets/AppWarning";

export const MainLayout = () => {
  return (
    <Flex direction="column" minH="100vh" alignItems="center" w="100%">
      <AppHeader />
      <AppWarning />
      <Flex flex="1 0" w="100%">
        <Outlet />
      </Flex>
      <AppFooter />
    </Flex>
  );
};
