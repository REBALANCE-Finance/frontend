import { Button, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { FC } from "react";

import { FormInput } from "../../../../components/forms/form-input";
import { withdrawSchema } from "../../../../components/forms/schemas";
import { formatNumber } from "../../../../utils/formatNumber";

interface IWithdrawTabProps {
  pool: any;
}

export const WithdrawTab: FC<IWithdrawTabProps> = ({ pool }) => {
  const { handleSubmit, handleChange, values, setFieldValue, isValid, errors } = useFormik({
    initialValues: {
      withdraw: ""
    },
    validationSchema: withdrawSchema("100"),
    onSubmit: e => console.log(e)
  });

  const setMax = (value: string) => {
    setFieldValue("withdraw", value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <Flex direction="column" gap="24px">
        <FormInput
          id="withdraw"
          isValid={isValid}
          errorMessage={errors.withdraw}
          value={values.withdraw}
          handleChange={handleChange}
        />

        <HStack justify="space-between">
          <Text color="black.0">Your deposit</Text>
          <Text textStyle="textMono16">${formatNumber(pool.deposit)}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="black.0">Use as collateral</Text>
          <Text>-</Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="black.0">Available to withdraw</Text>
          <Flex align="inherit">
            <Text textStyle="textMono16">${formatNumber(2222)}</Text>
            <Button color="greenAlpha.100" onClick={() => setMax("1000")}>
              Max
            </Button>
          </Flex>
        </HStack>

        <Divider borderColor="black.90" />

        <HStack justify="space-between">
          <Text color="black.0">30D profit</Text>
          <Text textStyle="textMono16">${formatNumber(30)}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="black.0">Gas fee</Text>
          <Text textStyle="textMono16">{formatNumber(0.000005)} (ETH)</Text>
        </HStack>

        <Button variant="primaryFilled">Withdraw</Button>
      </Flex>
    </form>
  );
};
