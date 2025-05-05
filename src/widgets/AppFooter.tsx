import { Box, Flex, Image, Link, useMediaQuery } from "@chakra-ui/react";
import React from "react";

import LogoDesc from "/public/assets/logo/logo-long.svg";
import LogoMob from "/public/assets/logo/logo-short.svg";
import Icon from "../components/icon";
import { MEDIA_QUERY_MAX } from "../consts";
import { FooterLink, FooterMedia } from "./utils";
import NextLink from "next/link";

export const AppFooter = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justify="space-between"
      maxW={"1300px"}
      w="100%"
      alignItems="center"
      p={{ base: "6px 16px", md: "24px 16px", xxl: "24px 0" }}
      mt={!media ? "40px" : "24px"}
      gap={{ base: "24px", md: "0" }}
    >
      <Box h="30px" w={{ base: "126px", lg: "30px" }} />

      <Flex gap={{ base: "24px", md: "40px" }} order={{ base: 0, md: 1 }}>
        {FooterLink.map(link => (
          <Link variant="link" as={NextLink} key={link.name} href={link.path}>
            {link.name}
          </Link>
        ))}
      </Flex>

      <Flex gap={{ base: "24px" }} order={{ base: 1, md: 2 }}>
        {FooterMedia.map(media => (
          <Link key={media.name} as={NextLink} href={media.path} target="_blank">
            <Icon name={media.name} />
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};
