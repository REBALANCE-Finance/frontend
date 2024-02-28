import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { AppFooter } from "../widgets/AppFooter";
import { AppHeader } from "../widgets/AppHeader";

export const MainLayout = () => {
  return (
    <Flex direction="column" h="100vh" alignItems="center" w="100%">
      <AppHeader />
      <Flex flex="1 0" w="100%">
        <Outlet />
      </Flex>
      <AppFooter />
    </Flex>
  );
};
