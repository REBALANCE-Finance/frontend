import { Circle } from "@chakra-ui/react";
import React from "react";

import Icon from "../icon";

export const TokenIcon = ({
  name,
  size = "64px",
  sizeIcon = "35px"
}: {
  name: string;
  size?: string;
  sizeIcon?: string;
}) => {
  const getIconName = () => {
    if (name.includes("USDC.")) {
      return "USDC";
    }
    if (name === "wETH") {
      return "WETH";
    }
    if (name === "wBNB") {
      return "WBNB";
    }
    return name;
  };

  return (
    <Circle
      border="1px solid"
      borderColor="darkGray"
      borderRadius="full"
      size={size ? size : "64px"}
    >
      <Icon
        name={getIconName()}
        size={sizeIcon ? sizeIcon : "35px"}
      />
    </Circle>
  );
};
