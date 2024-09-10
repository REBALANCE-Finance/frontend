import {
  Card as ChakraCard,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Text,
  Box,
  Image
} from "@chakra-ui/react";
import React, { FC } from "react";

import { TOKEN_ICONS } from "../../consts";
import { IRowCard, RowCardProccessType } from "../../pagesComponents/Pools/types";
import { DefaultDataType } from "../../types";
import { TokenIcon } from "../token-icon";

interface ICardProps {
  rowCard: IRowCard[];
  itemCard: DefaultDataType;
  isLoading?: boolean;
}

export const CardPool: FC<ICardProps> = ({ rowCard, itemCard, isLoading }) => {
  return (
    <ChakraCard cursor="pointer" variant="poolCard" position="relative" justifySelf="center">
      {!itemCard.token ? (
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
                className={itemCard?.token === "USDT" ? "step-2" : ""}
              >
                <Flex alignItems="center" gap="12px">
                  <TokenIcon name={itemCard?.token} />
                  <Flex flexDir="column" gap={2}>
                    <Text textStyle="h2">{itemCard?.token}</Text>

                    {itemCard.token === "FRAX" && (
                      <Flex gap={1} alignItems="center">
                        <Flex
                          justify="center"
                          alignItems="center"
                          gap="4px"
                          padding="4px 8px"
                          borderRadius="100px"
                          bg="greenAlpha.100"
                          pointerEvents="none"
                          userSelect="none"
                        >
                          <Image
                            src="/assets/icons/arbitrum-icon.svg"
                            h="16px"
                            w="16px"
                            alt="arb"
                          />
                          <Text
                            textStyle="text14"
                            color="black.100"
                            fontWeight={700}
                            lineHeight="14px"
                          >
                            ARB incentive
                          </Text>
                        </Flex>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
                {elem.proccess && elem.proccess({ item: itemCard })}
              </CardHeader>
            );
          case "body":
            return (
              <CardBody
                key={elem.name}
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
              <CardFooter mt="24px" gap="8px" key={elem.name}>
                {elem.proccess && elem.proccess({ item: itemCard })}
              </CardFooter>
            );
        }
      })}
    </ChakraCard>
  );
};
