import { Flex, HStack, Link, StackDivider, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";

import { CircularProgress } from "../../../components/circular-progress";
import Icon from "../../../components/icon";
import { ICON_NAMES, MEDIA_QUERY_MAX } from "../../../consts";
// import { Menu } from "./components/Menu";
import { Strategies } from "./components/Strategies";
import NextLink from "next/link";

export const PoolsHeader = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex gap="20px" w={media ? "100%" : "auto"}>
        <Strategies />
        <Link
          ml="auto"
          as={NextLink}
          // as={Flex}
          display="flex"
          href="https://bridge.arbitrum.io/?destinationChain=arbitrum-one&sourceChain=ethereum"
          alignItems="center"
          gap="8px"
          fontSize="sm"
          color="whiteAlpha.70"
          isExternal
        >
          Bridge to Arbitrum
          <Icon name={ICON_NAMES.link} color="#5C6470" size="sm" />
        </Link>
      </Flex>

        <Flex gap="20px" align="center">
          <HStack
            fontSize="sm"
            color="rgba(92, 100, 112, 1)"
            divider={<StackDivider borderColor="rgba(92, 100, 112, 1)" />}
          >
           {!media && (
            <>
              <Text mr={2} color="darkGray">Running since 19 Jan 2024</Text>
              <Text color="darkGray">DAO governed</Text>
            </>
          )}
            <Link as={NextLink}
              display={"flex"}
              href="/RebalanceContractsAudit.pdf"
              rel="noreferrer"
              target="_blank"
              alignItems="center" gap="8px" color="darkGray">
              Audited
              <Icon name={ICON_NAMES.link} size="sm" />
            </Link>
          </HStack>

          {/* <Menu /> */}

          {!media && (<CircularProgress />)}
        </Flex>

    </Flex>
  );
};
