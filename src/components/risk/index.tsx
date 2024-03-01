import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";

import { themes } from "../../themes";
import { IRiskProps } from "./types";

const riskColor = {
  1: themes.colors.greenAlpha["100"],
  2: themes.colors.greenAlpha["100"],
  3: themes.colors.orangeAlpha["100"],
  4: themes.colors.orangeAlpha["100"],
  5: themes.colors.redAlpha["100"]
};

export const Risk: FC<IRiskProps> = ({ risk }) => {
  const defaultRiskItems = Array.from({ length: 5 }, (_, i) => (
    <Box key={i} w="4px" h="24px" bg="black.60"></Box>
  )).slice(risk);
  const activeRiskItems = Array.from({ length: risk }, (_, i) => (
    <Box key={i} w="4px" h="24px" bg={riskColor[risk as keyof typeof riskColor]}></Box>
  ));

  const finaly = [...activeRiskItems, ...defaultRiskItems];

  return <Flex gap="4px">{finaly}</Flex>;
};
