import { Flex, HStack, Link, StackDivider, Text, useMediaQuery } from "@chakra-ui/react";
import React from "react";

import { CircularProgress } from "../../../components/common/circular-progress";
import { Icon } from "../../../components/common/icon";
import { ICON_NAMES, MEDIA_QUERY_MAX } from "../../../consts";
import { Menu } from "./components/Menu";
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
            <Icon name={ICON_NAMES.link} size="sm" />
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
            <Text>Running since 19 Jan 2024</Text>

            <Text>DAO governed</Text>

            <Link as={Flex} alignItems="center" gap="8px">
              Audited
              <Icon name={ICON_NAMES.link} size="sm" />
            </Link>
          </HStack>

          <Menu />

          <CircularProgress />
        </Flex>
      )}
    </Flex>
  );
};
