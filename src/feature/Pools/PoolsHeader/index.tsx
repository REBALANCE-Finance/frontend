import { Flex, HStack, Link, StackDivider, Text } from "@chakra-ui/react";
import React from "react";

import { Icon } from "../../../components/common/icon";
import { ICON_NAMES } from "../../../consts";
import { Menu } from "./components/Menu";
import { Strategies } from "./components/Strategies";

export const PoolsHeader = () => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Flex gap="20px">
        <Strategies />
        <Link as={Flex} alignItems="center" gap="8px" fontSize="sm" color="whiteAlpha.70">
          Bridge to Arbitrum
          <Icon name={ICON_NAMES.link} size="sm" />
        </Link>
      </Flex>

      <Flex gap="20px">
        <HStack fontSize="sm" color="rgba(92, 100, 112, 1)" divider={<StackDivider />}>
          <Text>Running since 19 Jan 2024</Text>

          <Text>DAO governed</Text>

          <Link as={Flex} alignItems="center" gap="8px">
            Audited
            <Icon name={ICON_NAMES.link} size="sm" />
          </Link>
        </HStack>

        <Menu />

        <span>timer</span>
      </Flex>
    </Flex>
  );
};
