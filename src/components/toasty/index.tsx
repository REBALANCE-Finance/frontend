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
    <Flex flexDirection="column" gap="10px">
      <Text fontSize="lg" fontWeight="500">
        {titles[type]}
      </Text>
      {children}
    </Flex>
  );
};
