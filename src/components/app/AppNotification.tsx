import { Box } from "@chakra-ui/react";
import React from "react";

import { ICON_NAMES } from "../../consts";
import { Icon } from "../common/icon";

export const AppNotification = () => {
  return (
    <Box
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
