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
  IconButton,
  PopoverArrow
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import {
  ICON_NAMES,
  NEW_MOCKED_TASKS,
  ROUTE_PATHS,
  TELEGRAM_FOLLOW_LINK,
  TWITTER_FOLLOW_URL
} from "@/consts";
import { scrollToElement } from "@/utils";
import Task from "../task";
import { completeTask, getEarnedPoints, getTasks } from "@/api/points/queries";
import { Task as ITask, TaskType } from "@/types";
import { observer } from "mobx-react-lite";
import { useStore } from "@/hooks/useStoreContext";
import { useBalanceOfAssets } from "@/hooks/useBalanceOfAssets";
import { ModalEnum } from "@/store/modal/types";
import { useAccount } from "wagmi";
import Icon from "../icon";
import { usePathname } from "next/navigation";
import { isDesktop, isMobile } from "react-device-detect";
import { useAnalyticsEventTracker } from "@/hooks/useAnalyticsEventTracker";

type UserTasksPopoverProps = {
  address: `0x${string}`;
};

const UserTasksPopover = observer(({ address }: UserTasksPopoverProps) => {
  const pathname = usePathname();
  const { isConnected } = useAccount();
  const { pools, isFetched: isFetchedPools } = useStore("poolsStore");
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [hasTasksData, setHasTasksData] = useState(false);
  const [poolTokens, setPoolTokens] = useState<
    { contractAddress: `0x${string}`; decimals: number }[]
  >([]);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
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
  const tooltipRef = useRef(null);
  const { hasBalance } = useBalanceOfAssets(poolTokens, address);
  const [is600Up] = useMediaQuery("(min-width: 600px)");
  const [is700Up] = useMediaQuery("(min-width: 700px)");
  const { openModal } = useStore("modalStore");
  const event = useAnalyticsEventTracker();

  const fraxPool = pools.find(pool => pool.token === "FRAX");

  useEffect(() => {
    if (!isConnected) {
      setEarnedPoints(0);
    }
  }, [isConnected]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (pathname === ROUTE_PATHS.lending) {
      timer = setTimeout(() => {
        setIsOpenTooltip(true);
      }, 500);
    }

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    if (isConnected && pathname === ROUTE_PATHS.lending) {
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
      setHasTasksData(false);
    }
  }, [isOpenTooltip]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (
      isSuccessTask.twitter ||
      isSuccessTask.telegram ||
      isSuccessTask.wallet ||
      isSuccessTask.deposit ||
      isSuccessTask.freeze ||
      isSuccessTask.frax
    ) {
      timer = setTimeout(() => {
        setIsSuccessTask({
          twitter: false,
          telegram: false,
          wallet: false,
          deposit: false,
          freeze: false,
          frax: false
        });
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [
    isSuccessTask.twitter,
    isSuccessTask.telegram,
    isSuccessTask.wallet,
    isSuccessTask.deposit,
    isSuccessTask.freeze,
    isSuccessTask.frax
  ]);

  useEffect(() => {
    if (
      (address && isConnected) ||
      isSuccessTask.twitter ||
      isSuccessTask.telegram ||
      isSuccessTask.wallet ||
      isSuccessTask.deposit ||
      isSuccessTask.freeze ||
      isSuccessTask.frax
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
    isSuccessTask.freeze,
    isSuccessTask.frax
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

  const getTaskTypeByName = (name: string) => {
    if (name === "Follow us on Twitter") return "twitter";
    if (name === "Join us on Telegram") return "telegram";
    if (name === "Make a deposit") return "deposit";
    if (name === "Freeze deposit to farm points") return "freeze";
    if (name === "Deposit & freeze any FRAX amount") return "frax";
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
          tasks.map(item => ({
            ...item,
            type: getTaskTypeByName(item.name),
            limited: item.name === "Deposit & freeze any FRAX amount" ? true : false
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

  useEffect(() => {
    if (tasks.length > 0) {
      const fraxTask = tasks.find(task => task.type === "frax" && task.complete);

      if (fraxTask) {
        onDepositClaim();
      }
    }
  }, [tasks.length]);

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

  const getConnectBtn = (id?: string, onSendEvent?: VoidFunction) => {
    const connectBtn = {
      title: "Connect",
      id,
      loading: false,
      onClick: () => {
        if (onSendEvent) {
          onSendEvent();
        }
        // @ts-ignore
        openModal({ type: ModalEnum.ConnectWallet });
      }
    };

    return connectBtn;
  };

  const onConnectWalletStart = () => {
    event({
      action: "task_wallet",
      label: "Connect Wallet"
    });
  };

  const onConnectTwitterStart = () => {
    event({
      action: "task_twitter",
      label: "Follow us on Twitter"
    });
  };

  const onConnectTelegramStart = () => {
    event({
      action: "task_telegram",
      label: "Join us on Telegram"
    });
  };

  const onDepositStart = () => {
    event({
      action: "task_deposit",
      label: "Deposit freeze any FRAX amount"
    });
  };

  const onClaimConnectWallet = () => {
    event({
      action: "task_wallet_claim",
      label: "Connect Wallet claim"
    });
  };

  const onClaimTwitter = () => {
    event({
      action: "task_twitter_claim",
      label: "Follow us on Twitter claim"
    });
  };

  const onClaimTelegram = () => {
    event({
      action: "task_telegram_claim",
      label: "Join us on Telegram claim"
    });
  };

  const onDepositClaim = () => {
    event({
      action: "task_deposit_claim",
      label: "Deposit freeze any FRAX amount claim"
    });
  };

  const getButtonProps = (
    type: TaskType,
    index: number
  ): { title: string; loading: boolean; onClick: VoidFunction; id?: string } | undefined => {
    if (type === "wallet")
      return isConnected
        ? {
            title: "Claim",
            loading: loadingTask.wallet,
            onClick: () => {
              onClaimConnectWallet();
              onCompleteTask(index);
            },
            id: "task_wallet_claim"
          }
        : getConnectBtn("task_wallet", onConnectWalletStart);
    if (type === "telegram")
      return !isConnected
        ? getConnectBtn("task_telegram")
        : isTelegramChecked
        ? {
            title: "Claim",
            loading: loadingTask.telegram,
            onClick: () => {
              onClaimTelegram();
              onCompleteTask(index);
            },
            id: "task_telegram_claim"
          }
        : {
            title: "Join",
            loading: false,
            onClick: () => {
              onConnectTelegramStart();
              window.open(TELEGRAM_FOLLOW_LINK, "_blank");
              setIsTelegramChecked(true);
            }
          };
    if (type === "deposit")
      return !isConnected
        ? getConnectBtn()
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
        ? getConnectBtn()
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
        ? getConnectBtn("task_deposit")
        : {
            title: "Deposit",
            loading: !isFetchedPools,
            onClick: () => {
              onDepositStart();
              openModal({
                type: ModalEnum.Deposit,
                props: { pool: fraxPool, type: ModalEnum.Deposit }
              });
            },
            id: "task_deposit_claim"
          };
    }
    return !isConnected
      ? getConnectBtn("task_twitter")
      : isTwitterChecked
      ? {
          title: "Claim",
          loading: loadingTask.twitter,
          onClick: () => {
            onClaimTwitter();
            onCompleteTask(index);
          }
        }
      : {
          title: "Follow",
          loading: false,
          onClick: () => {
            onConnectTwitterStart();
            window.open(TWITTER_FOLLOW_URL, "_blank");
            setIsTwitterChecked(true);
          },
          id: "task_twitter_claim"
        };
  };

  return (
    <Popover isOpen={isOpenTooltip} onClose={() => setIsOpenTooltip(false)}>
      <PopoverTrigger>
        <Flex
          flexDir="column"
          alignItems="center"
          gap={1}
          bg="#DEDEDE"
          padding="4px 24px"
          borderRadius="100px"
          mr={isDesktop ? 6 : 0}
          cursor="pointer"
          onClick={() => setIsOpenTooltip(prev => !prev)}
        >
          <Text textStyle="textMono12" color="black.100" lineHeight="12px">
            Earn points
          </Text>
          <Flex gap={1} alignItems="center">
            <Image
              src="/assets/logo/logo-short-with-bg.svg"
              width="16px"
              height="16px"
              alt="logo"
            />
            <Text textStyle="text14" color="black.100" lineHeight="14px">
              {formatNumberWithCommas(earnedPoints)}
            </Text>
          </Flex>
        </Flex>
      </PopoverTrigger>
      <PopoverContent
        width="100%"
        maxW={is700Up ? 510 : "100vw"}
        border="none"
        ref={tooltipRef}
        ml={is700Up ? 3 : 0}
        borderRadius="8px"
        mt={isMobile ? `${window.innerHeight - 528 - 104}px` : 0}
      >
        {isDesktop && <PopoverArrow bg="#17191C" />}
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
