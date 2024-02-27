import { Box, Button, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import React from "react";

import { Icon } from "../components/icon";
import { ICON_NAMES, MEDIA_QUERY_MAX } from "../consts";
import { Notification } from "../features/Notification";

export const AppNotification = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <>
      <Box
        as={Button}
        order={media ? 2 : 0}
        onClick={onOpen}
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          w: "8px",
          h: "8px",
          right: "7px",
          bottom: "7px",
          borderRadius: "50%",
          bg: "red"
        }}
      >
        <Icon name={ICON_NAMES.notification} size="md" />
      </Box>

      <Notification isOpen={isOpen} onClose={onClose} />
    </>
  );
};
