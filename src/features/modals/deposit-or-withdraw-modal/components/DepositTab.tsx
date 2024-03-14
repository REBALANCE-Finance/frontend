import { Button, Divider, Flex, HStack, Switch, Text } from "@chakra-ui/react";
import { sepolia } from "@wagmi/core/chains";
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
  balance: number;
}

export const DepositTab: FC<IDepositTabProps> = ({ pool }) => {
  const { address } = useAccount();
  const { data: balanceToken } = useBalance({
    address,
    token: pool.tokenAddress,
    chainId: sepolia.id
  });

  const { allowance, deposit, approve, isLoading } = useDeposit(
    pool.rebalancerAddress,
    pool.tokenAddress
  );
  const formik = useFormik({
    initialValues: {
      deposit: ""
    },
    validationSchema: depositSchema(
      formatBigNumber(balanceToken?.value, balanceToken?.decimals),
      "100000000000"
    ),
    onSubmit: async values => {
      const depositValue = parseBigNumber(values.deposit, pool.decimals);
      if (!allowance || allowance < depositValue) {
        await approve({ value: depositValue, tokenAddress: pool.tokenAddress });
      }
      if (address) {
        await deposit({ value: depositValue, address });
      }
    }
  });

  const setMax = () => {
    formik.setFieldValue("deposit", formatBigNumber(balanceToken?.value, balanceToken?.decimals));
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex direction="column" gap="24px">
        <FormInput
          id="deposit"
          name="deposit"
          isValid={formik.isValid}
          errorMessage={formik.errors.deposit}
          value={formik.values.deposit}
          handleChange={formik.handleChange}
        />

        <HStack justify="space-between">
          <Text color="black.0">Wallet Balance</Text>
          <Flex align="inherit">
            <Text textStyle="textMono16">
              ${formatNumber(formatBigNumber(balanceToken?.value, balanceToken?.decimals))}
            </Text>
            <Button color="greenAlpha.100" onClick={setMax} isDisabled={isLoading}>
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

        <Button
          variant="primaryFilled"
          type="submit"
          isDisabled={!formik.values.deposit || !formik.isValid || isLoading}
        >
          {isLoading ? "Processing..." : "Deposit"}
        </Button>
      </Flex>
    </form>
  );
};
