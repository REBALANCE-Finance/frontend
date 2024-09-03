"use client";

import {
  Flex,
  Link,
  Image,
  useMediaQuery,
  Text,
  Skeleton,
  useOutsideClick,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button
} from "@chakra-ui/react";
import React, { useRef, useEffect, useState } from "react";
import NextLink from "next/link";
import { useAccount } from "wagmi";
import LogoDesc from "/public/assets/logo/logo-long.svg";
import LogoMob from "/public/assets/logo/logo-short.svg";
import { MEDIA_QUERY_MAX, ROUTE_PATHS } from "../consts";
import { ConnectWallet } from "../features/ConnectWallet";
import { WalletProfile } from "../features/WalletProfile";
import { AppNav } from "./AppNav";
import MaintenanceBlock from "@/components/maintenance-block";
import { getEarnedPoints, getTasks } from "@/api/points/queries";
import { formatNumberWithCommas } from "@/utils/formatNumber";
import { Tooltip } from "@/components/tooltip";
import { Task } from "@/types";

export const AppHeader = () => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  const { isConnected, address } = useAccount();
  const [earnedPoints, setEarnedPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isTasksLoading, setIsTasksLoading] = useState(false);
  const [isOpenTooltip, setIsOpenTooltip] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const isUnderMaintenance = process.env.NEXT_PUBLIC_IS_UNDER_MAINTENANCE === "true";
  const [isDesktop] = useMediaQuery("(min-width: 1130px)");
  const tooltipRef = useRef(null);

  useOutsideClick({
    // @ts-ignore
    ref: tooltipRef,
    handler: () => setIsOpenTooltip(false)
  });

  useEffect(() => {
    if (address) {
      const fetchPoints = async () => {
        setIsLoading(true);
        const points = await getEarnedPoints(address).finally(() => setIsLoading(false));
        setEarnedPoints(points);
      };
      fetchPoints();
    }
  }, [address]);

  useEffect(() => {
    if (address) {
      const fetchTasks = async () => {
        setIsTasksLoading(true);
        const tasks = await getTasks(address).finally(() => setIsTasksLoading(false));
        setTasks(tasks);
      };
      fetchTasks();
    }
  }, [address]);

  const getPointsOfTask = (index: number) => {
    if (index === 0 || index === 1) return 10;
    if (index === 2) return 30;
    if (index === 3) return 50;
    if (index === 4) return 100;
  };

  return (
    <Flex
      flexDir="column"
      w="100%"
      maxW={"1300px"}
      position="sticky"
      top={0}
      zIndex={100}
      bg="black.100"
      minH={isUnderMaintenance ? { base: "120px", md: "160px" } : { base: "56px", md: "56px" }}
    >
      {isUnderMaintenance && <MaintenanceBlock />}
      <Flex
        alignItems="center"
        p={{ base: "6px 16px", xl: "24px 0px" }}
        justifyContent="space-between"
        w="100%"
      >
        <Link as={NextLink} href={ROUTE_PATHS.lending}>
          <Image
            src={media ? LogoMob.src : LogoDesc.src}
            w={{ base: "30px", lg: media ? "30px" : "150px" }}
          />
        </Link>

        {!media && <AppNav />}

        <Flex gap="12px" alignItems="center">
          {isConnected && isDesktop && !isLoading && (
            <Popover isOpen={isOpenTooltip} onClose={() => setIsOpenTooltip(false)}>
              <PopoverTrigger>
                <Flex
                  alignItems="center"
                  gap={2}
                  mr={6}
                  cursor="pointer"
                  onClick={() => setIsOpenTooltip(prev => !prev)}
                >
                  <Text
                    textStyle="text16"
                    color="black.5"
                    borderBottom="1px dashed"
                    borderColor="black.5"
                  >
                    ✨ Earned:
                  </Text>
                  <Text textStyle="text16" color="black.5">
                    {formatNumberWithCommas(earnedPoints)}
                  </Text>
                </Flex>
              </PopoverTrigger>
              <PopoverContent width="100%" maxW={510} border="none" ref={tooltipRef}>
                <Flex flexDir="column" gap="24px" padding="12px" bg="#17191C" borderRadius="8px">
                  <Image src="/assets/image/TasksPoints.png" />
                  <Flex flexDir="column" gap="12px">
                    <Text fontSize="22px" fontWeight={500}>
                      Rebalance Incentives Campaign
                    </Text>
                    <Text textStyle="text14" color="#9FA2AB">
                      Don't miss the chance to earn Rebalance points as the community
                      incentivization program approaches!
                    </Text>
                  </Flex>
                  <Flex flexDir="column" gap="16px" padding="12px" bg="#272A30" borderRadius="8px">
                    <Flex justify="space-between" alignItems="center">
                      <Text textStyle="text16" color="#DEDEDE" fontWeight={500}>
                        Tasks
                      </Text>
                      <Text fontSize="12px" color="#9FA2AB">
                        Completed {tasks.filter(task => task.completed).length} of {tasks.length}
                      </Text>
                    </Flex>
                    <Flex flexDir="column" gap="12px">
                      {tasks.map((task, index) => (
                        <Flex key={task.name} justify="space-between">
                          <Flex gap="8px" alignItems="center">
                            <Image
                              src={
                                task.completed
                                  ? "assets/image/CompletedTask.svg"
                                  : "assets/image/UncompletedTask.svg"
                              }
                              width="16px"
                              height="16px"
                            />
                            <Text textStyle="text16" color="#DEDEDE">
                              {task.name}
                            </Text>
                            <Text textStyle="text16" color="#4CFF94">
                              +{getPointsOfTask(index)} points
                            </Text>
                          </Flex>
                          <Button
                            disabled
                            padding="4px 12px"
                            bg="#DEDEDE"
                            color="#09090B"
                            borderRadius="4px"
                            fontSize="14px"
                            height="max-content"
                          >
                            Claim
                          </Button>
                        </Flex>
                      ))}
                    </Flex>
                  </Flex>
                </Flex>
              </PopoverContent>
            </Popover>
          )}
          {!!address && isDesktop && isLoading && <Skeleton height="24px" width="60px" />}
          {/* {isConnected && <AppNotification />} */}
          {!!address ? <WalletProfile className="step-1" /> : <ConnectWallet className="step-1" />}
          {media && <AppNav />}
        </Flex>
      </Flex>
    </Flex>
  );
};
