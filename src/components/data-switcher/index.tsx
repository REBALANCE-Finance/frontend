import { Flex, HStack, Text } from "@chakra-ui/react";
import React, { FC } from "react";

import { IDateSwitcher } from "./types";

export const DateSwitcher: FC<IDateSwitcher> = ({ date, selectDate, selectedDate }) => {
  return (
    <HStack border="1px solid" borderColor="black.40" borderRadius="2px" bg="black.100" p="2px">
      {date.map((elem: any, i) => (
        <Flex
          key={i}
          justify="center"
          alignItems="center"
          px="5px"
          onClick={() => selectDate(elem)}
          cursor="pointer"
          p="4px 12px 4px 12px"
          borderRadius="2px"
          bg={elem.intervals === +selectedDate.intervals ? "black.40" : undefined}
          w="41px"
        >
          <Text fontSize="sm" color="lightGray">
            {elem.name}
          </Text>
        </Flex>
      ))}
    </HStack>
  );
};
