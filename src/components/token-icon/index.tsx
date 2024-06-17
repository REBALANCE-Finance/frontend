import { Circle } from "@chakra-ui/react";
import React from "react";

import Icon from "../icon";

export const TokenIcon = ({
  name,
  size,
  sizeIcon
}: {
  name: string;
  size?: string;
  sizeIcon?: string;
}) => {
  return (
    <Circle
      border="1px solid"
      borderColor="darkGray"
      borderRadius="full"
      size={size ? size : "64px"}
    >
      <Icon name={name?.includes(".") ? "USDCe" : name} size={sizeIcon ? sizeIcon : "35px"} />
    </Circle>
  );
};
