import { Flex, Image, Link } from "@chakra-ui/react";
import React from "react";

import Logo from "../../assets/logo/logo-short.svg";
import { Icon } from "../common/icon";
import { FooterLink, FooterMedia } from "./utils";

export const AppFooter = () => {
  return (
    <Flex
      justify="space-between"
      maxW={"1300px"}
      w="100%"
      alignItems="center"
      p={{ base: "6px 16px", md: "24px 16px", xxl: "24px 0" }}
      mt="40px"
    >
      <Image src={Logo} w="30px" h="30px" />

      <Flex gap={{ md: "40px" }}>
        {FooterLink.map(link => (
          <Link variant="link" key={link.name} href={link.path}>
            {link.name}
          </Link>
        ))}
      </Flex>

      <Flex gap={{ md: "24px" }}>
        {FooterMedia.map(media => (
          <Link key={media.name} href={media.path} target="_blank">
            <Icon name={media.name} />
          </Link>
        ))}
      </Flex>
    </Flex>
  );
};
