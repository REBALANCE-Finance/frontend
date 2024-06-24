import React from 'react';
import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";

interface AmountInputProps {
  amount: string;
  setAmount: (value: string) => void;
  maxAmount: number;
}

const AmountInput: React.FC<AmountInputProps> = ({ amount, setAmount, maxAmount }) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setAmount(value);
    }
  };

  const isExceedingBalance = Number(amount) > maxAmount;

  return (
    <InputGroup maxW="220px" border="none">
      <Input
        placeholder="0.00"
        value={amount}
        onChange={handleAmountChange}
        textAlign="right"
        padding="2px"
        borderColor={isExceedingBalance ? "red.500" : undefined}
      />
      {/* {isExceedingBalance && (
        <InputRightElement>
          <Box color="red.500" fontSize="sm">Exceeds Balance</Box>
        </InputRightElement>
      )} */}
    </InputGroup>
  );
};

export default AmountInput;
