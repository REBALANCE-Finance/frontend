import { Flex, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

import { ToastyTypes } from "./types";

const titles = {
  success: "Success!",
  error: "Oops... Something went wrong",
  warning: "Attention!",
  info: "Did you know?"
};

interface IToastWrapper extends PropsWithChildren {
  type: ToastyTypes;
}

export const ToastWrapper: FC<IToastWrapper> = ({ children, type }) => {
  return (
    <Flex flexDirection="column" gap="8px" h="100%" justify="center">
      {children}
    </Flex>
  );
};
