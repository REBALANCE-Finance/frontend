import { Box, Flex } from "@chakra-ui/react";
import React, { FC } from "react";

import { IRiskProps } from "./types";

const riskColor = {
  1: "green",
  2: "green",
  3: "orange",
  4: "red",
  5: "red"
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
