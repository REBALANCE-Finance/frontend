import { Flex, Link } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

import { routesList } from "../../router/Routes";

export const AppNav = () => {
  return (
    <Flex gap="24px">
      {routesList.map(route => (
        <Link variant="nav" key={route.name} as={NavLink} to={route.path}>
          {route.name}
        </Link>
      ))}
    </Flex>
  );
};
