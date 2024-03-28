import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import React, { FC } from "react";

import { MEDIA_QUERY_MAX } from "../../../../consts";
import { ILegendAreaChart } from "../types";
import { themes } from "@/themes";

export const LegendAreaChart: FC<ILegendAreaChart> = ({ text, color, subText }) => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  return (
    <Flex direction={'column'}>
    <Flex
      alignItems="center"
      _before={{
        position: "relative",
        content: '""',
        w: "12px",
        h: "2px",
        bg: color,
        mr: "6px"
      }}
      margin={media ? "inherit" : "inherit"}
    >
        <Text color="white" whiteSpace={'pre-wrap'} fontWeight={'500'}>{text}</Text>
      </Flex>
      {subText ? (
        <Text color={themes.colors.darkGray} whiteSpace={'pre-wrap'} fontWeight={'500'} ml={media ? 0 : '18px'}>{subText}</Text>
      ) : null}
    </Flex>
  );
};
