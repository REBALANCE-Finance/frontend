import {
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  Image,
  useOutsideClick,
  useMediaQuery,
  Skeleton,
  IconButton
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { ICON_NAMES, NEW_MOCKED_TASKS, TELEGRAM_FOLLOW_LINK, TWITTER_FOLLOW_URL } from "@/consts";
import { scrollToElement } from "@/utils";
import Task from "../task";
import { completeTask, getEarnedPoints, getTasks } from "@/api/points/queries";
import { Task as ITask, TaskType } from "@/types";
import { observer } from "mobx-react-lite";
import { useStore } from "@/hooks/useStoreContext";
import { useBalanceOfAssets } from "@/hooks/useBalanceOfAssets";
import { ModalEnum } from "@/store/modal/types";
import { useAccount } from "wagmi";
import localStore from "@/utils/localStore";
import Icon from "../icon";

type UserTasksPopoverProps = {
  address: `0x${string}`;
};

const UserTasksPopover = observer(({ address }: UserTasksPopoverProps) => {
  const { isConnected } = useAccount();
  const { pools, isFetched: isFetchedPools } = useStore("poolsStore");
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [hasTasksData, setHasTasksData] = useState(false);
  const [poolTokens, setPoolTokens] = useState<
    { contractAddress: `0x${string}`; decimals: number }[]
  >([]);
  const [isOpenTooltip, setIsOpenTooltip] = useState(true);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isTwitterChecked, setIsTwitterChecked] = useState(false);
  const [isTelegramChecked, setIsTelegramChecked] = useState(false);
  const [isMadeDeposit, setIsMadeDeposit] = useState(false);
  const [loadingTask, setLoadingTask] = useState<{
    twitter: boolean;
    telegram: boolean;
    wallet: boolean;
    deposit: boolean;
    freeze: boolean;
  }>({
    twitter: false,
    telegram: false,
    wallet: false,
    deposit: false,
    freeze: false
  });
  const [isSuccessTask, setIsSuccessTask] = useState<{
    twitter: boolean;
    telegram: boolean;
    wallet: boolean;
    deposit: boolean;
    freeze: boolean;
  }>({
    twitter: false,
    telegram: false,
    wallet: false,
    deposit: false,
    freeze: false
  });
  const tooltipRef = useRef(null);
  const { hasBalance } = useBalanceOfAssets(poolTokens, address);
  const [is600Up] = useMediaQuery("(min-width: 600px)");
  const [is700Up] = useMediaQuery("(min-width: 700px)");
  const { openModal } = useStore("modalStore");

  const fraxPool = pools.find(pool => pool.token === "FRAX");

  useEffect(() => {
    if (isConnected) {
      setIsOpenTooltip(true);
    }
  }, [isConnected]);

  useEffect(() => {
    if (isOpenTooltip && !isConnected) {
      setTasks(NEW_MOCKED_TASKS);
      setHasTasksData(true);
    }
  }, [isOpenTooltip, isConnected]);

  useEffect(() => {
    if (hasBalance) {
      setIsMadeDeposit(true);
    }
  }, [hasBalance]);

  useEffect(() => {
    if (!isOpenTooltip) {
      setTasks([]);
      setPoolTokens([]);
    }
  }, [isOpenTooltip]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      isSuccessTask.twitter ||
      isSuccessTask.telegram ||
      isSuccessTask.wallet ||
      isSuccessTask.deposit ||
      isSuccessTask.freeze
    ) {
      timer = setTimeout(() => {
        setIsSuccessTask({
          twitter: false,
          telegram: false,
          wallet: false,
          deposit: false,
          freeze: false
        });
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [
    isSuccessTask.twitter,
    isSuccessTask.telegram,
    isSuccessTask.wallet,
    isSuccessTask.deposit,
    isSuccessTask.freeze
  ]);

  useEffect(() => {
    if (
      address &&
      isConnected &&
      (isSuccessTask.twitter ||
        isSuccessTask.telegram ||
        isSuccessTask.wallet ||
        isSuccessTask.deposit ||
        isSuccessTask.freeze)
    ) {
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
    isSuccessTask.freeze
  ]);

  useEffect(() => {
    if (pools && isFetchedPools && isOpenTooltip) {
      const fraxPool = pools.find(pool => pool.token === "FRAX");

      if (fraxPool) {
        const preparedTokens = [fraxPool].map(pool => ({
          contractAddress: pool.rebalancerAddress as `0x${string}`,
          decimals: pool.decimals
        }));
        setPoolTokens(preparedTokens);
      }
    }
  }, [pools, isFetchedPools, isOpenTooltip]);

  const getTaskTypeByIndex = (index: number) => {
    // if (index === 0) return "wallet";
    // if (index === 2) return "telegram";
    // if (index === 3) return "deposit";
    // if (index === 4) return "freeze";

    // return "twitter";
    if (index === 1) return "frax";
    if (index === 2) return "twitter";
    if (index === 3) return "telegram";
    return "wallet";
  };

  useEffect(() => {
    if (
      address &&
      isConnected &&
      (isOpenTooltip ||
        isSuccessTask.twitter ||
        isSuccessTask.telegram ||
        isSuccessTask.wallet ||
        isSuccessTask.deposit ||
        isSuccessTask.freeze)
    ) {
      const fetchTasks = async () => {
        setIsTasksLoading(true);
        const tasks = await getTasks(address).finally(() => setIsTasksLoading(false));
        setTasks(
          tasks.map((item, index) => ({
            ...item,
            type: getTaskTypeByIndex(index)
          }))
        );
        setHasTasksData(true);
      };
      fetchTasks();
    }
  }, [
    address,
    isConnected,
    isOpenTooltip,
    isSuccessTask.twitter,
    isSuccessTask.telegram,
    isSuccessTask.wallet,
    isSuccessTask.deposit,
    isSuccessTask.freeze
  ]);

  useOutsideClick({
    // @ts-ignore
    ref: tooltipRef,
    handler: () => setIsOpenTooltip(false)
  });

  const getPointsOfTask = (type: TaskType) => {
    if (type === "wallet") return 30;
    if (type === "deposit") return 50;
    if (type === "freeze") return 100;
    if (type === "frax") return 500;
    return 10;
  };

  const onCompleteTask = (index: number) => {
    if (address) {
      const task = tasks[index];

      setLoadingTask(prev => ({ ...prev, [task.type]: true }));

      completeTask(address, task.name).finally(() => {
        setLoadingTask(prev => ({ ...prev, [task.type]: false }));
        setIsSuccessTask(prev => ({ ...prev, [task.type]: true }));
      });
    }
  };

  const connectBtn = {
    title: "Connect",
    loading: false,
    onClick: () => {
      // @ts-ignore
      openModal({ type: ModalEnum.ConnectWallet });
    }
  };


  const getButtonProps = (
    type: TaskType,
    index: number
  ): { title: string; loading: boolean; onClick: VoidFunction } => {
    if (type === "wallet")
      return isConnected
        ? { title: "Claim", loading: loadingTask.wallet, onClick: () => onCompleteTask(index) }
        : connectBtn;
    if (type === "telegram")
      return !isConnected
        ? connectBtn
        : isTelegramChecked
        ? { title: "Claim", loading: loadingTask.telegram, onClick: () => onCompleteTask(index) }
        : {
            title: "Join",
            loading: false,
            onClick: () => {
              window.open(TELEGRAM_FOLLOW_LINK, "_blank");
              setIsTelegramChecked(true);
            }
          };
    if (type === "deposit")
      return !isConnected
        ? connectBtn
        : isMadeDeposit
        ? { title: "Claim", loading: loadingTask.deposit, onClick: () => onCompleteTask(index) }
        : {
            title: "Deposit",
            loading: false,
            onClick: () => {
              setIsOpenTooltip(false);
              scrollToElement("pools");
            }
          };
    if (type === "freeze")
      return !isConnected
        ? connectBtn
        : isMadeDeposit
        ? { title: "Claim", loading: loadingTask.freeze, onClick: () => onCompleteTask(index) }
        : {
            title: "Deposit",
            loading: false,
            onClick: () => {
              setIsOpenTooltip(false);
              scrollToElement("pools");
            }
          };
    if (type === "frax") {
      return !isConnected
        ? connectBtn
        : hasBalance
        ? {
            title: "Deposit",
            loading: false,
            onClick: () => {
              openModal({
                type: ModalEnum.Deposit,
                props: { pool: fraxPool, type: ModalEnum.Deposit }
              });
            }
          }
        : { title: "Claim", loading: false, onClick: () => onCompleteTask(index) };
    }
    return !isConnected
      ? connectBtn
      : isTwitterChecked
      ? { title: "Claim", loading: loadingTask.twitter, onClick: () => onCompleteTask(index) }
      : {
          title: "Follow",
          loading: false,
          onClick: () => {
            window.open(TWITTER_FOLLOW_URL, "_blank");
            setIsTwitterChecked(true);
          }
        };
  };

  return (
    <Popover isOpen={isOpenTooltip} onClose={() => setIsOpenTooltip(false)}>
      <PopoverTrigger>
        <Flex
          alignItems="center"
          gap={2}
          mr={6}
          cursor="pointer"
          onClick={() => setIsOpenTooltip(prev => !prev)}
        >
          <Text textStyle="text16" color="black.5" borderBottom="1px dashed" borderColor="black.5">
            ✨ Earned:
          </Text>
          <Image src="/assets/logo/logo-short.svg" width="16px" height="16px" alt="rebalance" />
          <Text textStyle="text16" color="black.5">
            {formatNumberWithCommas(earnedPoints)}
          </Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent
        width="100%"
        maxW={is700Up ? 510 : "calc(100vw - 24px)"}
        border="none"
        ref={tooltipRef}
        ml={is600Up ? 3 : 0}
        mx={is700Up ? 0 : 3}
      >
        <Flex
          flexDir="column"
          gap="24px"
          padding="12px"
          bg="#17191C"
          borderRadius="8px"
          position="relative"
        >
          <Image src="/assets/image/TasksPoints.png" />
          <IconButton
            aria-label="close"
            icon={<Icon name={ICON_NAMES.close} />}
            onClick={() => setIsOpenTooltip(false)}
            pos="absolute"
            top={5}
            right={5}
            bg="#17191C"
            boxSize="32px"
            padding="4px"
            borderRadius="8px"
            minW={0}
          />
          <Flex flexDir="column" gap="12px">
            <Text fontSize="22px" fontWeight={500}>
              Rebalance Incentives Campaign
            </Text>
            <Text textStyle="text14" color="#9FA2AB">
              Don't miss the chance to earn Rebalance points as the community incentivization
              program approaches!
            </Text>
          </Flex>
          <Flex flexDir="column" gap="16px" padding="12px" bg="#272A30" borderRadius="8px">
            <Flex justify="space-between" alignItems="center">
              <Text textStyle="text16" color="#DEDEDE" fontWeight={500}>
                Tasks
              </Text>
              {!isTasksLoading && (
                <Text fontSize="12px" color="#9FA2AB">
                  Completed {tasks.filter(task => task.complete).length} of {tasks.length}
                </Text>
              )}
            </Flex>
            {!hasTasksData ? (
              Array.from({ length: 5 })
                .fill(0)
                .map((_, index) => (
                  <Flex flexDir="column" gap="16px">
                    <Skeleton height="24px" width="100%" />
                  </Flex>
                ))
            ) : (
              <Flex flexDir="column" gap="16px">
                {tasks.map((task, index) => (
                  <Task
                    {...task}
                    pointsQty={getPointsOfTask(task.type)}
                    ButtonProps={getButtonProps(task.type, index)}
                  />
                ))}
              </Flex>
            )}
          </Flex>
        </Flex>
      </PopoverContent>
    </Popover>
  );
});

export default UserTasksPopover;
