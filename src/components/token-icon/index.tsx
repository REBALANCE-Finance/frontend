import { Circle } from "@chakra-ui/react";
import React from "react";

import Icon from "../icon";

export const TokenIcon = ({ name }: { name: string }) => {
  return (
    <Circle border="1px solid" borderColor="darkGray" borderRadius="full" size="64px">
      <Icon name={name} size="35px" />
    </Circle>
  );
};
