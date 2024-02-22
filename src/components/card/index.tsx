import {
  Box,
  Button,
  Card as ChakraCard,
  CardBody,
  CardFooter,
  CardHeader,
  Circle,
  Divider,
  Flex,
  Text
} from "@chakra-ui/react";
import React from "react";

export const Card = () => {
  return (
    <ChakraCard variant="poolCard">
      <CardHeader as={Flex} justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap="12px">
          <Circle size="64px" bg="red">
            T
          </Circle>
          <Text textStyle="h2">Token Name</Text>
        </Flex>

        <Flex direction="column" alignItems="center">
          <Text fontFamily="Roboto mono" fontSize="xs" color="#5C6470">
            RISK
          </Text>
          <Flex gap="4px">
            <Box w="4px" h="24px" bg="black.60"></Box>
            <Box w="4px" h="24px" bg="black.60"></Box>
            <Box w="4px" h="24px" bg="black.60"></Box>
            <Box w="4px" h="24px" bg="black.60"></Box>
            <Box w="4px" h="24px" bg="black.60"></Box>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody as={Flex} direction="column" gap="20px">
        <Flex flex="1 1 0">Metrics</Flex>

        <Divider color="black.60" />
        <Flex>My total</Flex>
      </CardBody>

      <CardFooter gap="8px">
        <Button variant="primaryFilled" flex="1 1 0">
          Deposit
        </Button>

        <Button variant="outline" flex="1 1 0">
          Withdraw
        </Button>
      </CardFooter>
    </ChakraCard>
  );
};
