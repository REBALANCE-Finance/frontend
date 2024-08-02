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
import * as Yup from "yup";
import React, { FC, useEffect, useState } from "react";
import { useAccount, useBalance } from "wagmi";

import { FormInput } from "../../../../components/forms/form-input";
import { useDeposit } from "../../../../hooks/useDeposit";
import { formatBigNumber, parseBigNumber } from "../../../../utils/formatBigNumber";
import { formatNumber, formatPercent } from "../../../../utils/formatNumber";
import ApproveBtn from "./ApproveBtn";
import DepositButton from "@/components/button/DepositButton";
import { DataSwitcher } from "@/components/data-switcher/DataSwitcher";
import { FREEZE_DATES } from "@/components/data-switcher/utils";
import { getPredictedPoints } from "@/api/points/queries";
import useDebounce from "@/hooks/useDebounce";
import { Tooltip } from "@/components/tooltip";

interface IDepositTabProps {
  pool: any;
  onClose: () => void;
}

export const DepositTab: FC<IDepositTabProps> = ({ pool, onClose }) => {
  const [needsApproval, setNeedsApproval] = useState(false);
  const [isConfirmedApprove, setConfirmedApprove] = useState(false);
  const [pointsQty, setPointsQty] = useState(0);
  const { address } = useAccount();
  const { data: balanceToken } = useBalance({
    address,
    token: pool.tokenAddress
  });

  const onDeposit = () => {
    if (address) {
      deposit({
        value: parseBigNumber(formik.values.deposit, pool.decimals),
        address
      });
    }
  };

  const { allowance, deposit, isLoading } = useDeposit(
    pool.rebalancerAddress,
    pool.tokenAddress,
    onClose,
    onDeposit
  );

  const depositSchema = Yup.object().shape({
    deposit: Yup.string().test("min-amount", `Amount must be at least 1$`, value => {
      const depositValue = BigInt(parseBigNumber(value || "0", pool.decimals));
      const minAmount = BigInt(1e6) * BigInt(Math.pow(10, pool.decimals));
      return depositValue >= 1e6;
    }),
    freeze: Yup.boolean(),
    freezePeriod: Yup.string().required("Required")
  });

  const formik = useFormik({
    initialValues: {
      deposit: "",
      freeze: true,
      freezePeriod: FREEZE_DATES[0]
    },
    validationSchema: depositSchema,
    onSubmit: async values => {
      const depositValue = parseBigNumber(values.deposit, pool.decimals);
      if (address) {
        await deposit({
          value: depositValue,
          address
        });
      }
    }
  });

  const debouncedDeposit = useDebounce(formik.values.deposit, 500);

  useEffect(() => {
    if (formik.values.deposit) {
      const checkNeedsApproval = () => {
        const depositValue = BigInt(parseBigNumber(formik.values.deposit, pool.decimals));
        const isApprovalNeeded = !allowance || BigInt(allowance) < depositValue;
        setNeedsApproval(isApprovalNeeded);
      };
      checkNeedsApproval();
    }
  }, [allowance, formik.values.deposit, pool.decimals]);

  useEffect(() => {
    if (formik.values.freeze) {
      const fetchPoints = async () => {
        const points = await getPredictedPoints(
          pool.token,
          +debouncedDeposit,
          +formik.values.freezePeriod.slice(0, -1)
        );
        setPointsQty(points);
      };

      fetchPoints();
    }
  }, [pool, debouncedDeposit, formik.values.freezePeriod, formik.values.freeze]);

  useEffect(() => {
    if (!formik.values.freeze) {
      setPointsQty(0);
    }
  }, [formik.values.freeze]);

  const setMax = () => {
    formik.setFieldValue("deposit", formatBigNumber(balanceToken?.value, balanceToken?.decimals));
  };

  const getPointsString = (points: number) => {
    return `+ ${formatNumber(points)} points`;
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
          <Tooltip label="Points earned on Rebalance">
            <FormLabel htmlFor="freeze" mb="0" borderBottom="1px dashed #fff">
              Freeze ✨
            </FormLabel>
          </Tooltip>
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
            {getPointsString(pointsQty)}
          </Text>
        </Flex>

        <Divider borderColor="black.90" />

        <HStack justify="space-between">
          <Text color="black.0">30D average APY</Text>
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
            onDeposit={onDeposit}
          />
        )}
      </Flex>
    </form>
  );
};
