import { FC } from "react";
import { Flex, Text, Box } from "@chakra-ui/react";

type VaultInfoProgressProps = {
  now: number;
  total: number;
};

const VaultInfoProgress: FC<VaultInfoProgressProps> = ({ now, total }) => {
  // Calculate the percentage of the progress
  const progressPercentage = (now / total) * 100;

  return (
    <Flex
      alignItems="center"
      height="22px"
      w="100%"
      bg="black.20"
      borderRadius="100px"
      padding={[1, 2]}
      position="relative"
      overflow="hidden"
    >
      {/* Progress Bar */}
      <Box
        position="absolute"
        left={0}
        top={0}
        bottom={0}
        width={`${progressPercentage}%`}
        bg="#4CFF94CC"
        borderRadius="100px"
      />

      {/* Total Value at the end */}
      <Text
        position="absolute"
        right={2}
        fontSize="12px"
        lineHeight="14px"
        fontWeight={700}
        color="black.0"
      >
        {total}
      </Text>

      {/* Current Value on the progress bar */}
      <Text
        fontSize="12px"
        lineHeight="14px"
        fontWeight={700}
        color="black.100"
        position="relative"
        zIndex={1}
        left={`${progressPercentage / 2}%`}
        transform={`translateX(-${progressPercentage / 2}%)`}
      >
        {now}
      </Text>
    </Flex>
  );
};

export default VaultInfoProgress;
