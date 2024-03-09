import { Flex, HStack, Link, StackDivider, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";

import { CircularProgress } from "../../../components/circular-progress";
import Icon from "../../../components/icon";
import { ICON_NAMES, MEDIA_QUERY_MAX } from "../../../consts";
// import { Menu } from "./components/Menu";
import { Strategies } from "./components/Strategies";

export const PoolsHeader = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  return (
    <Flex alignItems="center" justifyContent={{ base: "center", md: "space-between" }}>
      <Flex gap="20px">
        <Strategies />
        {!media && (
          <Link as={Flex} alignItems="center" gap="8px" fontSize="sm" color="whiteAlpha.70">
            Bridge to Arbitrum
            <Icon name={ICON_NAMES.link} color="#5C6470" size="sm" />
          </Link>
        )}
      </Flex>

      {!media && (
        <Flex gap="20px" align="center">
          <HStack
            fontSize="sm"
            color="rgba(92, 100, 112, 1)"
            divider={<StackDivider borderColor="rgba(92, 100, 112, 1)" />}
          >
            <Text color="darkGray">Running since 19 Jan 2024</Text>

            <Text color="darkGray">DAO governed</Text>

            <Link as={Flex} alignItems="center" gap="8px" color="darkGray">
              Audited
              <Icon name={ICON_NAMES.link} size="sm" />
            </Link>
          </HStack>

          {/* <Menu /> */}

          <CircularProgress />
        </Flex>
      )}
    </Flex>
  );
};
