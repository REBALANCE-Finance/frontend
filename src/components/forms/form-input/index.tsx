import {
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputProps,
  InputRightAddon,
  Text
} from "@chakra-ui/react";
import React, { ChangeEvent, FC } from "react";

import { formatNumber } from "../../../utils/formatNumber";
import { handlerNumberInput } from "../../../utils/handleNumberInput";

interface IFormInputProps extends InputProps {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isValid: boolean;
  errorMessage: string | undefined;
}

export const FormInput: FC<IFormInputProps> = ({
  handleChange,
  isValid,
  errorMessage,
  ...rest
}) => {
  return (
    <FormControl isInvalid={!isValid}>
      <InputGroup borderColor={!isValid ? "redAlpha.80" : undefined}>
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
          <Text>USDT</Text>
        </Flex>

        <Input
          {...rest}
          onChange={e => handlerNumberInput(e, handleChange)}
          textStyle="textMono16"
          isInvalid={false}
        />

        <InputRightAddon>
          <Text textStyle="textMono12" color="darkGray">
            ${formatNumber(rest?.value)}
          </Text>
        </InputRightAddon>
      </InputGroup>

      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
};
