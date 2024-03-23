'use client'

import {
  Drawer,
  DrawerBody,
  // DrawerCloseButton,
  DrawerContent,
  Flex,
  IconButton,
  Link,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import React from "react";

import { routesList } from "@/routes/RouterList";
import Icon from "../components/icon";
import { MEDIA_QUERY_MAX } from "../consts";
import NextLink from "next/link";

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

        <Drawer isOpen={isOpen} onClose={onClose}>
          <DrawerContent
            position="absolute"
            height="calc(100% - 56px) !important"
            marginTop="auto"
            bg="#09090B"
          >
            {/* <DrawerCloseButton /> */}
            <DrawerBody as={Flex} direction="column" gap="16px" mt="25px">
              {routesList.map(route => (
                <Link
                  variant="nav"
                  key={route.name}
                  href={route.path}
                  as={NextLink}
                  onClick={onClose}
                  fontSize="lg"
                >
                  {route.name}
                </Link>
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  return (
    <Flex gap="24px">
      {routesList.map(route => (
        <Link variant="nav" key={route.name} as={NextLink} href={route.path}>
          {route.name}
        </Link>
      ))}
    </Flex>
  );
};
