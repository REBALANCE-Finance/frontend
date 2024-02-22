import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

import { Card } from "../../../components/card";

export const PoolsLending = () => {
  return (
    <SimpleGrid columns={{ base: 1, md: 3, lg: 4 }} spacing="24px">
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </SimpleGrid>
  );
};
