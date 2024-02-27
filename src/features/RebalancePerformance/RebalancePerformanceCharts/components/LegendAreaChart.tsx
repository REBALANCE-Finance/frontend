import { Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";

import { ILegendAreaChart } from "../types";

export const LegendAreaChart: FC<ILegendAreaChart> = ({ text, color }) => {
  return (
    <Flex
      alignItems="inherit"
      _before={{
        position: "relative",
        content: '""',
        w: "12px",
        h: "2px",
        bg: color,
        mr: "4px"
      }}
    >
      <Text color="black.5">{text}</Text>
    </Flex>
  );
};
