import { Card as ChakraCard, CardBody, CardFooter, CardHeader, Flex, Text } from "@chakra-ui/react";
import React, { FC } from "react";

import { TOKEN_ICONS } from "../../consts";
import { IRowCard, RowCardProccessType } from "../../pagesComponents/Pools/types";
import { DefaultDataType } from "../../types";
import { TokenIcon } from "../token-icon";

interface ICardProps {
  rowCard: IRowCard[];
  itemCard: DefaultDataType;
  onClick: () => void;
}

export const CardPool: FC<ICardProps> = ({ rowCard, itemCard, onClick }) => {
  return (
    <ChakraCard cursor="pointer" variant="poolCard" position="relative">
      {itemCard.token !== "usdt" ? (
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          margin="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
          background="000"
          backdropFilter="blur(4px)"
          zIndex="9"
          fontSize="large"
          fontWeight="500"
        >
          Coming Soon
        </Flex>
      ) : null}
      {rowCard.map(elem => {
        switch (elem.name) {
          case "header":
            return (
              <CardHeader
                cursor="pointer"
                key={elem.name}
                as={Flex}
                justifyContent="space-between"
                alignItems="center"
                onClick={onClick}
              >
                <Flex alignItems="center" gap="12px">
                  <TokenIcon name={TOKEN_ICONS[itemCard.token]} />
                  <Text textStyle="h2" textTransform="uppercase">
                    {itemCard?.token}
                  </Text>
                </Flex>
                {elem.proccess && elem.proccess({ item: itemCard })}
              </CardHeader>
            );
          case "body":
            return (
              <CardBody
                onClick={onClick}
                as={Flex}
                direction="column"
                gap="20px"
                textStyle="text16"
                lineHeight="24px"
              >
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
              <CardFooter mt="24px" gap="8px">
                {elem.proccess && elem.proccess({ item: itemCard })}
              </CardFooter>
            );
        }
      })}
    </ChakraCard>
  );
};
