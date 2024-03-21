import { Button, Divider, Flex, HStack, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import * as yup from "yup"; // Импорт Yup для схемы валидации

import { FormInput } from "../../../../components/forms/form-input";
import { useWithdraw } from "../../../../hooks/useWithdraw";
import { parseBigNumber } from "../../../../utils/formatBigNumber";
import { formatNumber } from "../../../../utils/formatNumber";

interface IWithdrawTabProps {
  pool: any;
  balance: number;
  address: `0x${string}`;
  onClose: () => void;
}

const withdrawSchema = yup.object({
  withdraw: yup
    .number()
    .required("Required")
    .positive("Must be positive")
    .max(yup.ref("balance"), "Cannot withdraw more than the available balance")
});

export const WithdrawTab: FC<IWithdrawTabProps> = observer(
  ({ pool, balance, address, onClose }) => {
    const instantWithdraw = useWithdraw(pool.rebalancerAddress, () => onClose());

    const formik = useFormik({
      initialValues: {
        withdraw: ""
      },
      validationSchema: withdrawSchema.clone().shape({
        balance: yup.number().default(balance)
      }),
      onSubmit: async values => {
        try {
          const assets = parseBigNumber(values.withdraw || "0", 6);
          await instantWithdraw({ address, assets });
        } catch (error) {
          console.error("Ошибка при выводе средств: ", error);
        }
      }
    });

    const setMax = () => {
      formik.setFieldValue("withdraw", balance.toString());
      formik.validateField("withdraw");
    };

    return (
      <form onSubmit={formik.handleSubmit}>
        <Flex direction="column" gap="24px">
          <FormInput
            id="withdraw"
            name="withdraw"
            isValid={formik.isValid}
            errorMessage={formik.errors.withdraw}
            value={formik.values.withdraw}
            handleChange={formik.handleChange}
          />
          <HStack justify="space-between">
            <Text color="black.0">Your deposit</Text>
            <Text textStyle="textMono16">${formatNumber(balance)}</Text>
          </HStack>

          {/* <HStack justify="space-between">
            <Text color="black.0">Use as collateral</Text>
            <Text>-</Text>
          </HStack> */}

          <HStack justify="space-between">
            <Text color="black.0">Available to withdraw</Text>
            <Flex align="inherit">
              <Text textStyle="textMono16">${formatNumber(balance)}</Text>
              <Button color="greenAlpha.100" onClick={() => setMax()}>
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

          <Button
            variant="primaryFilled"
            type="submit"
            isDisabled={!formik.values.withdraw || !formik.isValid}
          >
            Withdraw
          </Button>
        </Flex>
      </form>
    );
  }
);
