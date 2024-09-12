import { getEarnedPoints } from "@/api/points/queries";
import { ROUTE_PATHS } from "@/consts";
import { useStore } from "@/hooks/useStoreContext";
import { ModalEnum } from "@/store/modal/types";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { Flex, Text, Image } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isDesktop, isMobile } from "react-device-detect";
import { useAccount } from "wagmi";

const MobileTasksPopover = () => {
  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { openModal } = useStore("modalStore");
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTask, setLoadingTask] = useState<{
    twitter: boolean;
    telegram: boolean;
    wallet: boolean;
    deposit: boolean;
    freeze: boolean;
    frax: boolean;
  }>({
    twitter: false,
    telegram: false,
    wallet: false,
    deposit: false,
    freeze: false,
    frax: false
  });
  const [isSuccessTask, setIsSuccessTask] = useState<{
    twitter: boolean;
    telegram: boolean;
    wallet: boolean;
    deposit: boolean;
    freeze: boolean;
    frax: boolean;
  }>({
    twitter: false,
    telegram: false,
    wallet: false,
    deposit: false,
    freeze: false,
    frax: false
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (pathname === ROUTE_PATHS.lending) {
      timer = setTimeout(() => {
        // setIsOpenTooltip(true);
        openModal({
          // @ts-ignore
          type: ModalEnum.Tasks,
          props: {
            loadingTask,
            isSuccessTask,
            setLoadingTask,
            setIsSuccessTask
          }
        });
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (isConnected && pathname === ROUTE_PATHS.lending) {
      openModal({
        // @ts-ignore
        type: ModalEnum.Tasks,
        props: {
          loadingTask,
          isSuccessTask,
          setLoadingTask,
          setIsSuccessTask
        }
      });
    }
  }, [isConnected]);

  useEffect(() => {
    if (address && isConnected) {
      const fetchPoints = async () => {
        setIsLoading(true);
        const points = await getEarnedPoints(address).finally(() => setIsLoading(false));
        setEarnedPoints(points);
      };
      fetchPoints();
    }
  }, [
    address,
    isConnected,
    isSuccessTask.twitter,
    isSuccessTask.telegram,
    isSuccessTask.wallet,
    isSuccessTask.deposit,
    isSuccessTask.freeze,
    isSuccessTask.frax
  ]);

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      gap={1}
      bg="#DEDEDE"
      padding="4px 24px"
      borderRadius="100px"
      mr={isDesktop ? 6 : 0}
      cursor="pointer"
      onClick={() =>
        openModal({
          // @ts-ignore
          type: ModalEnum.Tasks,
          props: {
            loadingTask,
            isSuccessTask,
            setLoadingTask,
            setIsSuccessTask
          }
        })
      }
    >
      <Text textStyle="textMono12" color="black.100" lineHeight="12px">
        Earn points
      </Text>
      <Flex gap={1} alignItems="center">
        <Image src="/assets/logo/logo-short-with-bg.svg" width="16px" height="16px" alt="logo" />
        <Text textStyle="text14" color="black.100" lineHeight="14px">
          {formatNumberWithCommas(earnedPoints)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default MobileTasksPopover;
