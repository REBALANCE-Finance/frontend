import { Flex, IconButton, Link, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

import { MEDIA_QUERY_MAX } from "../../consts";
import { routesList } from "../../router/Routes";
import { Icon } from "../common/icon";

export const AppNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  const btnRef = React.useRef(null);

  const handleOpen = () => {
    if (isOpen) {
      onClose();
    } else {
      onOpen();
    }
  };

  if (media) {
    return (
      <>
        <IconButton
          order={3}
          ref={btnRef}
          aria-label="Icon"
          icon={<Icon name={isOpen ? "close" : "menu"} />}
          onClick={handleOpen}
        />
      </>
    );
  }

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
