import { Button, TabPanel } from "@chakra-ui/react";
import React from "react";

export const InboxTab = () => {
  return (
    <TabPanel>
      <Button
        variant="secondaryOutline"
        w="100%"
        p="0"
        borderRadius="50px"
        color="white"
        fontSize="sm"
      >
        Enable push notifications
      </Button>
    </TabPanel>
  );
};
