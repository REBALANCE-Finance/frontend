import { Flex, HStack, Text } from "@chakra-ui/react";
import React, { FC } from "react";

import { IDateSwitcher } from "./types";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export const DateSwitcher: FC<IDateSwitcher> = ({ date, selectDate, selectedDate }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const selected = searchParams.get('intervals') || 30;
  
  return (
    <HStack border="1px solid" borderColor="black.40" borderRadius="2px" bg="black.100" p="2px">
      {date.map((elem: any, i) => (
        <Flex
          key={i}
          justify="center"
          alignItems="center"
          px="5px"
          cursor="pointer"
          p="4px 12px 4px 12px"
          borderRadius="2px"
          bg={elem.intervals === +selected ? "black.40" : undefined}
          w="41px"
        >
          <Text fontSize="sm" color="lightGray" as={Link} href={`${pathname}?interval=${elem.interval}&intervals=${elem.intervals}`}>
            {elem.name}
          </Text>
        </Flex>
      ))}
    </HStack>
  );
};
