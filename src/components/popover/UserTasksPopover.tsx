import {
  Flex,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  Image,
  useOutsideClick,
  Spinner,
  useMediaQuery
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { TELEGRAM_FOLLOW_LINK, TWITTER_FOLLOW_URL } from "@/consts";
import { scrollToElement } from "@/utils";
import Task from "../task";
import { completeTask, getEarnedPoints, getTasks } from "@/api/points/queries";
import { Task as ITask } from "@/types";
import { observer } from "mobx-react-lite";
import { useStore } from "@/hooks/useStoreContext";
import { useBalanceOfAssets } from "@/hooks/useBalanceOfAssets";

type UserTasksPopoverProps = {
  address: `0x${string}`;
};

const UserTasksPopover = observer(({ address }: UserTasksPopoverProps) => {
  const { pools, isFetched: isFetchedPools } = useStore("poolsStore");
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [poolTokens, setPoolTokens] = useState<
    { contractAddress: `0x${string}`; decimals: number }[]
  >([]);
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
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
      address ||
      isSuccessTask.twitter ||
      isSuccessTask.telegram ||
      isSuccessTask.wallet ||
      isSuccessTask.deposit ||
      isSuccessTask.freeze
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
    isSuccessTask.twitter,
    isSuccessTask.telegram,
    isSuccessTask.wallet,
    isSuccessTask.deposit,
    isSuccessTask.freeze
  ]);

  useEffect(() => {
    if (pools && isFetchedPools && isOpenTooltip) {
      const preparedTokens = pools.map(pool => ({
        contractAddress: pool.rebalancerAddress as `0x${string}`,
        decimals: pool.decimals
      }));
      setPoolTokens(preparedTokens);
    }
  }, [pools, isFetchedPools, isOpenTooltip]);

  const getTaskTypeByIndex = (index: number) => {
    if (index === 1) return "telegram";
    if (index === 2) return "wallet";
    if (index === 3) return "deposit";
    if (index === 4) return "freeze";

    return "twitter";
  };

  useEffect(() => {
    if (
      (address && isOpenTooltip) ||
      isSuccessTask.twitter ||
      isSuccessTask.telegram ||
      isSuccessTask.wallet ||
      isSuccessTask.deposit ||
      isSuccessTask.freeze
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
      };
      fetchTasks();
    }
  }, [
    address,
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

  const getPointsOfTask = (index: number) => {
    if (index === 2) return 30;
    if (index === 3) return 50;
    if (index === 4) return 100;
    return 10;
  };

  const onCompleteTask = (index: number) => {
    const task = tasks[index];

    setLoadingTask(prev => ({ ...prev, [task.type]: true }));

    completeTask(address, task.name).finally(() => {
      setLoadingTask(prev => ({ ...prev, [task.type]: false }));
      setIsSuccessTask(prev => ({ ...prev, [task.type]: true }));
    });
  };

  const getButtonProps = (
    index: number
  ): { title: string; loading: boolean; onClick: VoidFunction } => {
    if (index === 1)
      return isTelegramChecked
        ? { title: "Claim", loading: loadingTask.telegram, onClick: () => onCompleteTask(index) }
        : {
            title: "Join",
            loading: false,
            onClick: () => {
              window.open(TELEGRAM_FOLLOW_LINK, "_blank");
              setIsTelegramChecked(true);
            }
          };
    if (index === 2)
      return { title: "Claim", loading: loadingTask.wallet, onClick: () => onCompleteTask(index) };
    if (index === 3)
      return isMadeDeposit
        ? { title: "Claim", loading: loadingTask.deposit, onClick: () => onCompleteTask(index) }
        : {
            title: "Deposit",
            loading: false,
            onClick: () => {
              setIsOpenTooltip(false);
              scrollToElement("pools");
            }
          };
    if (index === 4)
      return isMadeDeposit
        ? { title: "Claim", loading: loadingTask.freeze, onClick: () => onCompleteTask(index) }
        : {
            title: "Deposit",
            loading: false,
            onClick: () => {
              setIsOpenTooltip(false);
              scrollToElement("pools");
            }
          };
    return isTwitterChecked
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
          <Text textStyle="text16" color="black.5">
            {formatNumberWithCommas(earnedPoints)}
          </Text>
        </Flex>
      </PopoverTrigger>
      <PopoverContent
        width="100%"
        maxW={is600Up ? 510 : 350}
        border="none"
        ref={tooltipRef}
        ml={is600Up ? 3 : 0}
      >
        <Flex flexDir="column" gap="24px" padding="12px" bg="#17191C" borderRadius="8px">
          <Image src="/assets/image/TasksPoints.png" />
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
            {isTasksLoading ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : (
              <Flex flexDir="column" gap="12px">
                {tasks.map((task, index) => (
                  <Task
                    {...task}
                    pointsQty={getPointsOfTask(index)}
                    ButtonProps={getButtonProps(index)}
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
