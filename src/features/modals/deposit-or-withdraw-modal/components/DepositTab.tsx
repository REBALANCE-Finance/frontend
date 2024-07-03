import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Switch,
  Text
} from "@chakra-ui/react";
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
import { handlerToast } from "@/components/toasty/utils";
import { DEPOSIT_SUCESS } from "@/consts";
import { ToastyTypes } from "@/components/toasty/types";
import { DataSwitcher } from "@/components/data-switcher/DataSwitcher";
import { FREEZE_DATES } from "@/components/data-switcher/utils";
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
      deposit: "",
      freeze: true,
      freezePeriod: FREEZE_DATES[0]
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

  const setMax = () => {
    formik.setFieldValue("deposit", formatBigNumber(balanceToken?.value, balanceToken?.decimals));
  };

  const onSuccessDeposit = () => {
    handlerToast({
      content: DEPOSIT_SUCESS,
      type: ToastyTypes.success
    });
  };

  const getPointsString = (points: number) => {
    return `+ ${formatNumber(points)} points`;
  };

  console.log("is", formik.values.freezePeriod);

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
          tokenName={pool.token}
        />

        <HStack justify="space-between">
          <Text color="black.0">Wallet Balance</Text>
          <Flex align="inherit">
            <Text textStyle="textMono16">
              ${formatNumber(formatBigNumber(balanceToken?.value, balanceToken?.decimals))}
            </Text>
            <Button color="green.100" onClick={setMax} isDisabled={isLoading}>
              Max
            </Button>
          </Flex>
        </HStack>

        <Divider borderColor="black.90" />

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          <FormLabel htmlFor="freeze" mb="0" borderBottom="1px dashed #fff">
            Freeze ✨
          </FormLabel>
          <Switch id="freeze" isChecked={formik.values.freeze} onChange={formik.handleChange} />
        </FormControl>

        <Flex justify="space-between" gap={4} alignItems="center">
          <Text color={!formik.values.freeze ? "darkgray" : "black.0"}>Choose freeze period</Text>
          <DataSwitcher
            data={FREEZE_DATES}
            value={formik.values.freezePeriod}
            onChange={value => formik.setFieldValue("freezePeriod", value)}
            isDisabled={!formik.values.freeze}
          />
        </Flex>

        <Flex justify="space-between" gap={4} alignItems="center">
          <Text color={!formik.values.freeze ? "darkgray" : "black.0"}>
            Projected point earnings
          </Text>
          <Text color={!formik.values.freeze ? "darkgray" : "greenAlpha.100"}>
            {getPointsString(1234)}
          </Text>
        </Flex>

        <Divider borderColor="black.90" />

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
            onDeposit={onSuccessDeposit}
          />
        )}
      </Flex>
    </form>
  );
};
