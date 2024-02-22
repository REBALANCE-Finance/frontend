import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { AppBanner } from "../components/app/AppBanner";
import { AppFooter } from "../components/app/AppFooter";
import { AppHeader } from "../components/app/AppHeader";

export const MainLayout = () => {
  return (
    <Flex direction="column" h="100vh" alignItems="center" w="100%">
      <AppHeader />
      <AppBanner />
      <Flex flex="1 0" maxW="1300px" w="100%">
        <Outlet />
      </Flex>
      <AppFooter />
    </Flex>
  );
};
