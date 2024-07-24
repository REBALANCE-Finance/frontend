import React from "react";
import { Box, Input, InputGroup, InputProps, InputRightElement } from "@chakra-ui/react";

type AmountInputProps = {
  amount: string;
  setAmount: (value: string) => void;
  maxAmount: number;
} & InputProps;

const AmountInput: React.FC<AmountInputProps> = ({ amount, setAmount, maxAmount, ...props }) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value))) {
      setAmount(value);
    }
  };

  const isExceedingBalance = Number(amount) > maxAmount;

  return (
    <Input
      data-group
      placeholder="0.00"
      value={amount}
      onChange={handleAmountChange}
      textAlign="right"
      padding="2px"
      borderColor={isExceedingBalance ? "red.500" : undefined}
      {...props}
    />
  );
};

export default AmountInput;
