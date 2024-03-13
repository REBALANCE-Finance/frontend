import { Button, Divider, Flex, HStack, Switch, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { FC } from "react";
import { useAccount, useBalance } from "wagmi";

import { FormInput } from "../../../../components/forms/form-input";
import { depositSchema } from "../../../../components/forms/schemas";
import { useDeposit } from "../../../../hooks/useDeposit";
import { formatBigNumber, parseBigNumber } from "../../../../utils/formatBigNumber";
import { formatNumber, formatPercent } from "../../../../utils/formatNumber";

interface IDepositTabProps {
  pool: any;
}

export const DepositTab: FC<IDepositTabProps> = ({ pool }) => {
  const { address } = useAccount();
  const { data: balanceToken } = useBalance({
    address,
    token: pool.tokenAddress
  });

  const { approve } = useDeposit(pool.rebalancerAddress);

  const { handleSubmit, handleChange, values, setFieldValue, isValid, errors } = useFormik({
    initialValues: {
      deposit: ""
    },
    validationSchema: depositSchema(
      formatBigNumber(balanceToken?.value, balanceToken?.decimals),
      "100000000000"
    ),
    onSubmit: values => {
      approve({
        value: parseBigNumber(values.deposit, pool.decimals),
        tokenAddress: pool.tokenAddress
      });
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
            <Text textStyle="textMono16">
              ${formatNumber(formatBigNumber(balanceToken?.value, balanceToken?.decimals))}
            </Text>
            <Button
              color="greenAlpha.100"
              onClick={() => setMax(formatBigNumber(balanceToken?.value, balanceToken?.decimals))}
            >
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
