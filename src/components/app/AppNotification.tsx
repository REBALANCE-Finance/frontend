import { Box, useMediaQuery } from "@chakra-ui/react";
import React from "react";

import { ICON_NAMES, MEDIA_QUERY_MAX } from "../../consts";
import { Icon } from "../common/icon";

export const AppNotification = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  return (
    <Box
      order={media ? 2 : 0}
      position="relative"
      _after={{
        content: '""',
        position: "absolute",
        w: "8px",
        h: "8px",
        right: "0",
        bottom: "0",
        borderRadius: "50%",
        bg: "red"
      }}
    >
      <Icon name={ICON_NAMES.notification} size="md" />
    </Box>
  );
};
