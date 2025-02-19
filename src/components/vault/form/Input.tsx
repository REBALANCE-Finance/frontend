import { Divider, Flex, FormControl, FormErrorMessage, InputGroup, Text } from "@chakra-ui/react";
import { FC } from "react";
import Select, { SelectOption } from "./Select";

type VaultFormInputProps = {
  token: {
    value: SelectOption;
    items: SelectOption[];
    handleChange: (value: SelectOption) => void;
  };
  amount: {
    value: SelectOption;
    items: SelectOption[];
    handleChange: (value: SelectOption) => void;
  };
  isValid: boolean;
  error?: string;
};

const VaultFormInput: FC<VaultFormInputProps> = ({ token, amount, isValid, error }) => (
  <FormControl isInvalid={!isValid}>
    <InputGroup borderColor={!isValid ? "redAlpha.80" : undefined}>
      <Select value={token.value} onChange={token.handleChange} options={token.items} />
      <Divider orientation="vertical" w="1px" height="28px" />

      <Flex gap={2} alignItems="center" ml="auto">
        <Text fontFamily="mono" fontSize="12px" lineHeight="14px" fontWeight={500} color="darkGray">
          select your amount
        </Text>

        <Select value={amount.value} onChange={amount.handleChange} options={amount.items} />
      </Flex>
    </InputGroup>

    <FormErrorMessage color="#E63946" fontSize="12px" lineHeight="14px">
      {error}
    </FormErrorMessage>
  </FormControl>
);

export default VaultFormInput;
