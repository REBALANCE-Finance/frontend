import React from 'react';
import { Input, InputGroup } from "@chakra-ui/react";

interface AmountInputProps {
  amount: string;
  setAmount: (value: string) => void;
  maxAmount: number;
}

const AmountInput: React.FC<AmountInputProps> = ({ amount, setAmount, maxAmount }) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!isNaN(Number(value)) && Number(value) <= maxAmount) {
      setAmount(value);
    }
  };

  return (
    <InputGroup maxW="220px" border="none">
      <Input
        placeholder="0.00"
        value={amount}
        onChange={handleAmountChange}
        textAlign="right"
      />
    </InputGroup>
  );
};

export default AmountInput;
