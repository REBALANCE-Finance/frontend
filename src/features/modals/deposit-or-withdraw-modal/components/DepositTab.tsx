import { Button, Divider, Flex, HStack, Switch, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { FC } from "react";

import { FormInput } from "../../../../components/forms/form-input";
import { depositSchema } from "../../../../components/forms/schemas";
import { formatNumber, formatPercent } from "../../../../utils/formatNumber";

interface IDepositTabProps {
  pool: any;
}

export const DepositTab: FC<IDepositTabProps> = ({ pool }) => {
  const { handleSubmit, handleChange, values, setFieldValue, isValid, errors } = useFormik({
    initialValues: {
      deposit: ""
    },
    validationSchema: depositSchema("100", "101"),
    onSubmit: e => {
      console.log("submit", e);
    }
  });

  const setMax = (value: string) => {
    setFieldValue("deposit", value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="24px">
        <FormInput
          id="deposit"
          name="deposit"
          isValid={isValid}
          errorMessage={errors.deposit}
          value={values.deposit}
          handleChange={handleChange}
        />

        <HStack justify="space-between">
          <Text color="black.0">Wallet Balance</Text>
          <Flex align="inherit">
            <Text textStyle="textMono16">${formatNumber(2222)}</Text>
            <Button color="greenAlpha.100" onClick={() => setMax("100")}>
              Max
            </Button>
          </Flex>
        </HStack>

        <Divider borderColor="black.90" />

        <HStack justify="space-between">
          <Text color="black.0">Use as collateral</Text>
          <Switch />
        </HStack>

        <HStack justify="space-between">
          <Text color="black.0">30D average APR</Text>
          <Text textStyle="textMono16">{formatPercent(pool.avgApr)}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="black.0">Gas fee</Text>
          <Text textStyle="textMono16">{formatNumber(0.000005)} (ETH)</Text>
        </HStack>

        <Button variant="primaryFilled" type="submit" isDisabled={!values.deposit || !isValid}>
          Deposit
        </Button>
      </Flex>
    </form>
  );
};
