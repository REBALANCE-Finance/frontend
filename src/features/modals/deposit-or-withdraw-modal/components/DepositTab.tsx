import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Switch,
  Text,
  useOutsideClick,
  Image,
  Link
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { FC, useEffect, useRef, useState } from "react";
import { useAccount, useBalance, useReadContract } from "wagmi";

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
import Stepper from "@/components/stepper";
import {
  ARB_TOKEN_ADDRESS,
  DEPOSIT_STEPS_BASIC,
  DEPOSIT_STEPS_WITH_FREEZE,
  FRAX_TOKEN_ADDRESS,
  ICON_NAMES,
  INSUFFICIENT_BALANCE_ERROR,
  LOCK_TOKENS_CONTRACT_ADDRESS,
  ROUTE_PATHS
} from "@/consts";
import Icon from "@/components/icon";
import { useLock } from "@/hooks/useLock";
import { useBalanceOfAsset } from "@/hooks/useBalanceOfAsset";
import { ABI_REBALANCE } from "@/abi/rebalance";
import { formatSharesNumber } from "@/utils";
import { useAnalyticsEventTracker } from "@/hooks/useAnalyticsEventTracker";

interface IDepositTabProps {
  pool: any;
  onClose: () => void;
}

export const DepositTab: FC<IDepositTabProps> = ({ pool, onClose }) => {
  const [needsApproval, setNeedsApproval] = useState(false);
  const [isConfirmedApprove, setConfirmedApprove] = useState(false);
  const [isConfirmedLockApprove, setIsConfirmedLockApprove] = useState(false);
  const [pointsQty, setPointsQty] = useState(0);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [sharesPreview, setSharesPreview] = useState("");
  const [error, setError] = useState("");
  const { address } = useAccount();
  const { data: balanceToken } = useBalance({
    address,
    token: pool.tokenAddress
  });
  const tooltipRef = useRef();
  const event = useAnalyticsEventTracker();

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

  useOutsideClick({
    // @ts-ignore
    ref: tooltipRef,
    handler: () => setIsOpenTooltip(false)
  });

  const getSecondsFromFreezeDate = (freezeDate: string) => {
    const freezePeriod = +freezeDate.slice(0, -1);

    return freezePeriod * 24 * 60 * 60;
  };

  const onDeposit = () => {
    if (address) {
      deposit({
        value: parseBigNumber(formik.values.deposit, pool.decimals),
        address
      });
    }
  };

  const onLock = () => {
    if (address) {
      lockTokens({
        tokenAddress: pool.rebalancerAddress,
        amount: parseBigNumber(sharesPreview, pool.decimals),
        durationInSeconds: BigInt(getSecondsFromFreezeDate(formik.values.freezePeriod))
      });
    }
  };

  const {
    allowance,
    deposit,
    isLoading: isLoadingDeposit,
    isSuccess: isSuccessDeposit
  } = useDeposit(
    pool.rebalancerAddress,
    pool.tokenAddress,
    onClose,
    onDeposit,
    !formik.values.freeze
  );

  const {
    allowance: lockAllowance,
    lockTokens,
    isLoading: isLockLoading,
    isSuccess: isSuccessLock,
    approve: approveLockTokens
  } = useLock(
    pool.rebalancerAddress,
    pool.tokenAddress,
    onClose,
    setIsConfirmedLockApprove,
    onLock
  );

  const { data: sharesData } = useReadContract({
    address: pool.rebalancerAddress,
    abi: ABI_REBALANCE,
    functionName: "previewDeposit",
    args: [parseBigNumber(formik.values.deposit, pool.decimals)],
    query: {
      enabled: !isSuccessDeposit
    }
  });

  useEffect(() => {
    if (sharesData) {
      const stringNumber = formatBigNumber(sharesData, pool.decimals);
      const preparedSharesValue = formatSharesNumber(stringNumber);
      setSharesPreview(preparedSharesValue);
    }
  }, [sharesData]);

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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSuccessDeposit) {
      timer = setTimeout(() => {
        approveLockTokens({
          value: parseBigNumber(sharesPreview, pool.decimals)
        });
      }, 3000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isSuccessDeposit]);

  useEffect(() => {
    if (
      Number(formik.values.deposit) >
      Number(formatBigNumber(balanceToken?.value, balanceToken?.decimals))
    ) {
      setError(INSUFFICIENT_BALANCE_ERROR);
    } else {
      setError("");
    }
  }, [formik.values.deposit, balanceToken?.value, balanceToken?.decimals]);

  const setMax = () => {
    const roundedBalance = Number(formatBigNumber(balanceToken?.value, balanceToken?.decimals));
    const floorBalance = (Math.floor(roundedBalance * 100) / 100).toString();

    formik.setFieldValue("deposit", floorBalance);
  };

  const getPointsString = (points: number) => {
    return `+ ${formatNumber(points)} points`;
  };

  const getActiveStepIndex = () => {
    if (!isConfirmedApprove && !isSuccessDeposit) {
      return 0; // Needs approval but no deposit success
    }

    if (isConfirmedApprove && !isSuccessDeposit) {
      return 1; // Approval done but deposit not successful
    }

    if (formik.values.freeze && isSuccessDeposit && !isSuccessLock && !isConfirmedLockApprove) {
      return 2; // Freeze option selected, deposit success but no lock allowance
    }

    if (formik.values.freeze && isConfirmedLockApprove) {
      return 3; // Freeze option selected, lock allowance exists, deposit success
    }

    if (formik.values.freeze && isSuccessLock) {
      return 4; // Freeze option selected and lock success
    }

    return 0; // Default case
  };

  const onSendApproveEvent = () => {
    event({
      action: "approve_deposit",
      label: "Approve"
    });
  };

  const onSendDepositEvent = () => {
    event({
      action: "execute_deposit",
      label: "Deposit"
    });
  };

  const getDepositTabButton = () => {
    if (isLoadingDeposit || isLockLoading) {
      return <Button variant="primaryFilled">Processing...</Button>;
    }

    if (needsApproval && !isSuccessDeposit) {
      return (
        <ApproveBtn
          tokenAddress={pool.tokenAddress}
          poolAddress={pool.rebalancerAddress}
          value={parseBigNumber(formik.values.deposit, pool.decimals)}
          setConfirmedApprove={setConfirmedApprove}
          isDisabled={
            Number(formik.values.deposit) >
            Number(formatBigNumber(balanceToken?.value, balanceToken?.decimals))
          }
          id="approve_deposit"
          onClick={onSendApproveEvent}
        />
      );
    }

    if (!isSuccessDeposit && !needsApproval) {
      return (
        <DepositButton
          variant="primaryFilled"
          isDisabled={!formik.values.deposit || !formik.isValid || isLoadingDeposit}
          onDeposit={onDeposit}
          id="execute_deposit"
          onClick={onSendDepositEvent}
        />
      );
    }

    if (formik.values.freeze && isSuccessDeposit && !isConfirmedLockApprove) {
      return (
        <ApproveBtn
          tokenAddress={pool.rebalancerAddress}
          poolAddress={LOCK_TOKENS_CONTRACT_ADDRESS}
          value={parseBigNumber(sharesPreview, pool.decimals)}
          setConfirmedApprove={setIsConfirmedLockApprove}
        />
      );
    }

    if (formik.values.freeze && isConfirmedLockApprove && isSuccessDeposit) {
      return (
        <DepositButton
          variant="primaryFilled"
          isDisabled={!formik.values.deposit || !formik.isValid || isLoadingDeposit}
          onDeposit={onLock}
          title="Freeze"
        />
      );
    }
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
            <Button color="green.100" onClick={setMax} isDisabled={isLoadingDeposit}>
              Max
            </Button>
          </Flex>
        </HStack>

        <Flex gap={2} alignItems="center">
          <Icon name={ICON_NAMES.help} size="sm" />
          <Flex textStyle="text14" gap={1}>
            <Text color="black.5">Don't have {pool.token}? Use</Text>
            <Link
              href={ROUTE_PATHS.swapPage(
                ARB_TOKEN_ADDRESS,
                pool.token === "FRAX" ? FRAX_TOKEN_ADDRESS : pool.tokenAddress
              )}
              target="_blank"
              color="#4cfd95"
              textDecor="underline"
            >
              our zero-fee swap
            </Link>
          </Flex>
        </Flex>

        <Divider borderColor="black.90" />

        <FormControl display="flex" alignItems="center" justifyContent="space-between">
          {/* @ts-ignore */}
          <Tooltip isOpen={isOpenTooltip} label="Points earned on Rebalance" ref={tooltipRef}>
            <Flex gap="8px" alignItems="center">
              <FormLabel
                mb="0"
                borderBottom="1px dashed #fff"
                onClick={() => setIsOpenTooltip(prev => !prev)}
              >
                Freeze ✨
              </FormLabel>
              {pool.token === "FRAX" && (
                <Flex
                  justify="center"
                  alignItems="center"
                  gap="4px"
                  padding="4px 12px"
                  borderRadius="100px"
                  bg="greenAlpha.100"
                  pointerEvents="none"
                  userSelect="none"
                >
                  <Box bg="black.100" p="4px" borderRadius="8px">
                    <Image src="/assets/logo/logo-short.svg" h="12px" w="12px" alt="logo" />
                  </Box>
                  <Text textStyle="text14" color="black.100" fontWeight={700}>
                    x2 points
                  </Text>
                </Flex>
              )}
            </Flex>
          </Tooltip>
          <Switch id="freeze" isChecked={formik.values.freeze} onChange={formik.handleChange} />
        </FormControl>

        {formik.values.freeze && (
          <>
            <Flex justify="space-between" gap={4} alignItems="center">
              <Text color={!formik.values.freeze ? "darkgray" : "black.0"}>
                Choose freeze period
              </Text>
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
          </>
        )}

        <Divider borderColor="black.90" />

        <HStack justify="space-between">
          <Text color="black.0">30D average APY</Text>
          <Text textStyle="textMono16">{formatPercent(pool.avgApr, true)}</Text>
        </HStack>

        <HStack justify="space-between">
          <Text color="black.0">Gas fee</Text>
          <Text textStyle="textMono16">{formatNumber(0.000005)} (ETH)</Text>
        </HStack>

        {error && (
          <Text textStyle="text14" color="redAlpha.80" textAlign="center">
            {error}
          </Text>
        )}

        {getDepositTabButton()}

        <Stepper
          steps={formik.values.freeze ? DEPOSIT_STEPS_WITH_FREEZE : DEPOSIT_STEPS_BASIC}
          activeIndex={getActiveStepIndex()}
        />
      </Flex>
    </form>
  );
};
