import { Flex, HStack, Text } from "@chakra-ui/react";
import React, { FC } from "react";

import { IDateSwitcher } from "./types";

interface IDataSwitcher {
  data: Array<string>;
  value: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  width?: string;
}

export const DataSwitcher: FC<IDataSwitcher> = ({ value, data, onChange, isDisabled, width }) => {
  return (
    <HStack
      border="1px solid"
      borderColor="black.40"
      borderRadius="2px"
      bg={isDisabled ? "black.60" : "black.100"}
      p="2px"
    >
      {data.map((elem: any, i) => (
        <Flex
          key={i}
          justify="center"
          alignItems="center"
          px="5px"
          onClick={isDisabled ? undefined : () => onChange(elem)}
          p="4px 12px 4px 12px"
          borderRadius="2px"
          bg={elem === value && !isDisabled ? "black.40" : undefined}
          w={width ?? "41px"}
          opacity={isDisabled ? 0.7 : 1}
          cursor={isDisabled ? "not-allowed" : "pointer"}
        >
          <Text fontSize="sm" color={isDisabled ? "darkgray" : "lightGray"}>
            {elem}
          </Text>
        </Flex>
      ))}
    </HStack>
  );
};
