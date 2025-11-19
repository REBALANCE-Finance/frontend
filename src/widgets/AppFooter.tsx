import { Flex, Image, useMediaQuery } from "@chakra-ui/react";
import React from "react";

import LogoDesc from "/public/assets/logo/logo-long.svg";
import LogoMob from "/public/assets/logo/logo-short.svg";
import { MEDIA_QUERY_MAX } from "../consts";

export const AppFooter = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  return (
    <Flex
      justify="center"
      alignItems="center"
      w="100%"
      p={{ base: "24px 16px", md: "40px 16px" }}
      mt={{ base: "24px", md: "40px" }}
    >
      <Image
        src={media ? LogoDesc.src : LogoMob.src}
        w={{ base: "auto", md: "30px" }}
        h="30px"
      />
    </Flex>
  );
};
