import {
  Card as ChakraCard,
  CardBody,
  CardFooter,
  CardHeader,
  Circle,
  Flex,
  Text
} from "@chakra-ui/react";
import React, { FC } from "react";

import { TOKEN_ICONS } from "../../consts";
import { IRowCard, RowCardProccessType } from "../../pages/Pools/types";
import { DefaultDataType } from "../../types";
import { Icon } from "../icon";

interface ICardProps {
  rowCard: IRowCard[];
  itemCard: DefaultDataType;
  onClick: () => void;
}

export const CardPool: FC<ICardProps> = ({ rowCard, itemCard, onClick }) => {
  return (
    <ChakraCard variant="poolCard" onClick={onClick}>
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
                  <Circle border="1px solid" borderColor="darkGray" borderRadius="full" size="64px">
                    <Icon name={TOKEN_ICONS[itemCard.token]} size="35px" />
                  </Circle>
                  <Text textStyle="h2">{itemCard?.token}</Text>
                </Flex>
                {elem.proccess && elem.proccess({ item: itemCard })}
              </CardHeader>
            );
          case "body":
            return (
              <CardBody as={Flex} direction="column" gap="20px" textStyle="text14">
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
