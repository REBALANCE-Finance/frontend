import {
  Box,
  Card as ChakraCard,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  // Image,
  Text
} from "@chakra-ui/react";
import React, { FC } from "react";

import { IRowCard, RowCardProccessType } from "../../pages/Pools/types";
import { DefaultDataType } from "../../types";
import { Icon } from "../icon";

interface ICardProps {
  rowCard: IRowCard[];
  itemCard: DefaultDataType;
}

export const Card: FC<ICardProps> = ({ rowCard, itemCard }) => {
  return (
    <ChakraCard variant="poolCard">
      {rowCard.map(elem => {
        switch (elem.name) {
          case "header":
            return (
              <CardHeader
                key={elem.name}
                as={Flex}
                justifyContent="space-between"
                alignItems="center"
              >
                <Flex alignItems="center" gap="12px">
                  {/* <Image boxSize="64px" src={itemCard?.icon} borderRadius="full" /> */}
                  <Box boxSize="64px" borderRadius="full">
                    <Icon name={itemCard.icon} size="100%" />
                  </Box>
                  <Text textStyle="h2">{itemCard?.token}</Text>
                </Flex>
                {elem.proccess && elem.proccess({ item: itemCard })}
              </CardHeader>
            );
          case "body":
            return (
              <CardBody as={Flex} direction="column" gap="20px">
                <Flex flex="1 1 0" direction="column" gap="10px">
                  {elem.proccess &&
                    elem.proccess({ item: itemCard, type: RowCardProccessType.metrics })}
                </Flex>

                {elem.proccess &&
                  elem.proccess({ item: itemCard, type: RowCardProccessType.assets })}
              </CardBody>
            );

          case "footer":
            return (
              <CardFooter gap="8px">
                {elem.proccess && elem.proccess({ item: itemCard })}
              </CardFooter>
            );
        }
      })}
    </ChakraCard>
  );
};
