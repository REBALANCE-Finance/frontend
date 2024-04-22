import { Button, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";

import { FormInput } from "../../../../components/forms/form-input";
import { depositSchema } from "../../../../components/forms/schemas";
import { useDeposit } from "../../../../hooks/useDeposit";
import { formatBigNumber, parseBigNumber } from "../../../../utils/formatBigNumber";
import { formatNumber, formatPercent } from "../../../../utils/formatNumber";
import ApproveBtn from "./ApproveBtn";
import DepositButton from "@/components/button/DepositButton";

interface IDepositTabProps {
  pool: any;
  onClose: () => void;
}

export const DepositTab: FC<IDepositTabProps> = ({ pool, onClose }) => {
  const [needsApproval, setNeedsApproval] = useState(false);
  const [isConfirmedApprove, setConfirmedApprove] = useState(false);
  const { address } = useAccount();
  const { data: balanceToken } = useBalance({
    address,
    token: pool.tokenAddress
  });

  const { allowance, deposit, isLoading } = useDeposit(
    pool.rebalancerAddress,
    pool.tokenAddress,
    onClose
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
      if (address) {
        await deposit({
          value: depositValue,
          address,
          onSuccess: () => {
            setConfirmedApprove(false);
            onClose();
          }
        });
      }
    }
  });

  const setMax = () => {
    formik.setFieldValue("deposit", formatBigNumber(balanceToken?.value, balanceToken?.decimals));
  };

  useEffect(() => {
    if (formik.values.deposit) {
      const checkNeedsApproval = () => {
        const depositValue = parseBigNumber(formik.values.deposit, pool.decimals);
        const isApprovalNeeded = !allowance || allowance < depositValue;
        setNeedsApproval(isApprovalNeeded);
      };
      checkNeedsApproval();
    }
  }, [allowance, formik.values.deposit, pool.decimals]);

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

        {/* <HStack justify="space-between">
          <Text color="black.0">Use as collateral</Text>
          <Switch />
        </HStack> */}

        <HStack justify="space-between">
          <Text color="black.0">30D average APR</Text>
          <Text textStyle="textMono16">{formatPercent(pool.avgApr)}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="black.0">Gas fee</Text>
          <Text textStyle="textMono16">{formatNumber(0.000005)} (ETH)</Text>
        </HStack>
        {isLoading ? (
          <Button variant="primaryFilled">Processing...</Button>
        ) : needsApproval && !isConfirmedApprove ? (
          <ApproveBtn
            tokenAddress={pool.tokenAddress}
            poolAddress={pool.rebalancerAddress}
            value={parseBigNumber(formik.values.deposit, pool.decimals)}
            setConfirmedApprove={setConfirmedApprove}
          />
        ) : (
          <DepositButton
            variant="primaryFilled"
            isDisabled={!formik.values.deposit || !formik.isValid || isLoading}
          />
        )}
      </Flex>
    </form>
  );
};
