import UnfreezeButton from "@/components/button/UnfreezeButton";
import { Divider, Flex, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";

type UnlockItemProps = {
  daysRemain: string;
  pointsEarned: number;
  isFreezeEnd: boolean;
  lockIds: number[];
  onSuccessUnlock: VoidFunction;
  amount: number;
  token: string;
};

const UnlockItem = ({
  daysRemain,
  pointsEarned,
  isFreezeEnd,
  lockIds,
  onSuccessUnlock,
  amount,
  token
}: UnlockItemProps) => {
  const [showedBtnIndex, setShowedBtnIndex] = useState(0);
  const [isLastLockRunned, setIsLastLockRunned] = useState(false);

  if (isLastLockRunned) {
    return <></>;
  }

  return (
    <Flex flexDir="column" gap={6}>
      <HStack justify="space-between">
        <Text color="black.0">Freeze days remain</Text>
        <Text textStyle="textMono16" letterSpacing="-2px">
          {daysRemain}
        </Text>
      </HStack>

      <HStack justify="space-between">
        <Text color="black.0">Points earned</Text>
        <Text textStyle="textMono16">{pointsEarned}</Text>
      </HStack>

      {lockIds.map(
        (lockId, index) =>
          showedBtnIndex === index && (
            <UnfreezeButton
              key={lockId}
              lockId={lockId}
              onSuccessUnlock={onSuccessUnlock}
              amount={amount}
              token={token}
              autoRun={index !== 0}
              onChangeBtnIndex={
                index === lockIds.length - 1
                  ? () => setShowedBtnIndex(prev => prev)
                  : () => setShowedBtnIndex(prev => prev + 1)
              }
              isLast={index === lockIds.length - 1}
              onLastLockRunned={() => setIsLastLockRunned(true)}
            />
          )
      )}

      {!isFreezeEnd && (
        <Text textStyle="text12" color="gray.100" textAlign="center">
          If you unfreeze your deposit before the freeze period ends, your points will be cancelled.
        </Text>
      )}

      <Divider />
    </Flex>
  );
};

export default UnlockItem;
