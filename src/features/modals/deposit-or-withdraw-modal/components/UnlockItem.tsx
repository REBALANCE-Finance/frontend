import UnfreezeButton from "@/components/button/UnfreezeButton";
import { Divider, Flex, HStack, Text } from "@chakra-ui/react";

type UnlockItemProps = {
  daysRemain: string;
  pointsEarned: number;
  isFreezeEnd: boolean;
  lockId: number;
  onSuccessUnlock: VoidFunction;
};

const UnlockItem = ({
  daysRemain,
  pointsEarned,
  isFreezeEnd,
  lockId,
  onSuccessUnlock
}: UnlockItemProps) => {
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

      <UnfreezeButton lockId={lockId} onSuccessUnlock={onSuccessUnlock} />

      {!isFreezeEnd && (
        <Text textStyle="text12" color="gray.100">
          If you unfreeze your deposit before the freeze period ends, your points will be cancelled.
        </Text>
      )}

      <Divider />
    </Flex>
  );
};

export default UnlockItem;
