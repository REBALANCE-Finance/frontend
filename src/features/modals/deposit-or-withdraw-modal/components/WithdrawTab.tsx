import {
  Button,
  Divider,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Text
} from "@chakra-ui/react";
import React, { FC } from "react";

interface IWithdrawTabProps {
  pool: any;
}

export const WithdrawTab: FC<IWithdrawTabProps> = ({ pool }) => {
  console.log("WIthdreaw");
  return (
    <Flex direction="column" gap="24px">
      <InputGroup>
        <Flex
          align="center"
          justify="center"
          minW="100px"
          h="100%"
          gap="12px"
          px="12px"
          borderRight="1px solid"
          borderColor="black.90"
        >
          <Text>{pool.token}</Text>
        </Flex>
        <Input textStyle="textMono16" />
        <InputRightAddon>
          <Text textStyle="textMono12" color="darkGray">
            100000
          </Text>
        </InputRightAddon>
      </InputGroup>

      <HStack justify="space-between">
        <Text color="black.0">Your deposit</Text>
        <Text textStyle="textMono16">$10100101</Text>
      </HStack>

      <HStack justify="space-between">
        <Text color="black.0">Use as collateral</Text>
        <Text>-</Text>
      </HStack>

      <HStack justify="space-between">
        <Text color="black.0">Available to withdraw</Text>
        <Flex align="inherit">
          <Text textStyle="textMono16">$2222</Text>
          <Button color="greenAlpha.100">Max</Button>
        </Flex>
      </HStack>

      <Divider borderColor="black.90" />

      <HStack justify="space-between">
        <Text color="black.0">30D profit</Text>
        <Text textStyle="textMono16">$30</Text>
      </HStack>

      <HStack justify="space-between">
        <Text color="black.0">Gas fee</Text>
        <Text textStyle="textMono16">0.000005 (ETH)</Text>
      </HStack>

      <Button variant="primaryFilled">Withdraw</Button>
    </Flex>
  );
};
