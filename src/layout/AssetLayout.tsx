import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { Outlet, useNavigate } from "react-router";

import Icon from "../components/icon";
import { ICON_NAMES } from "../consts";

export const AssetLayout = () => {
  const nanigate = useNavigate();
  return (
    <Flex direction="column" w="100%" gap="44px" align="center" p={{ base: "16px", xl: 0 }}>
      <Flex
        direction="column"
        justify="center"
        gap="20px"
        maxW="1300px"
        w="100%"
        align="start"
        h="100%"
      >
        <Button
          leftIcon={<Icon name={ICON_NAMES.arrowLeft} />}
          onClick={() => nanigate(-1)}
          color="#626262"
        >
          Back
        </Button>
        <Outlet />
      </Flex>
    </Flex>
  );
};
