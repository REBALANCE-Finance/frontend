import { Flex, useMediaQuery } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import { AppBanner } from "../components/app/AppBanner";
import { AppFooter } from "../components/app/AppFooter";
import { AppHeader } from "../components/app/AppHeader";
import { MEDIA_QUERY_MAX } from "../consts";
import { RebalancePerformanceMob } from "../feature/RebalancePerformance";

export const MainLayout = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  return (
    <Flex direction="column" h="100vh" alignItems="center" w="100%">
      <AppHeader />
      {media && <RebalancePerformanceMob />}
      <AppBanner />
      <Flex flex="1 0" maxW="1300px" w="100%">
        <Outlet />
      </Flex>
      <AppFooter />
    </Flex>
  );
};
