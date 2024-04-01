import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { FC } from "react";

import { MEDIA_QUERY_MAX } from "../../../../consts";
import { ILegendAreaChart } from "../types";

export const LegendAreaChart: FC<ILegendAreaChart> = ({ text, color }) => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
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
      margin={media ? "auto" : "inherit"}
    >
      <Text color="black.5">{text}</Text>
    </Flex>
  );
};
