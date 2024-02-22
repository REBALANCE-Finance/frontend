import { Flex } from "@chakra-ui/react";
import { AppHeader } from "../components/app/AppHeader";
import { FC, PropsWithChildren } from "react";
import { AppFooter } from "../components/app/AppFooter";
import { AppBanner } from "../components/app/AppBanner";

export const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex direction="column" h="100vh" alignItems="center" w="100%">
      <AppHeader />
      <AppBanner />
      <Flex flex="1 0" maxW="1360px" w="100%">
        {children}
      </Flex>
      <AppFooter />
    </Flex>
  );
};
