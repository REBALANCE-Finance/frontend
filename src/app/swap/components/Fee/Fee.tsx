import { Box, Skeleton, Text } from "@chakra-ui/react";

type FeeProps = {
  exchangeRate: string;
  gasFee: string;
  isLoading: boolean;
};

const Fee = ({ exchangeRate, gasFee, isLoading }: FeeProps) => {
  if (isLoading) {
    return <Skeleton height={16} mt={3} />;
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      background="#09090B"
      p="20px 24px"
      borderRadius="4px"
      mt="12px"
    >
      <Text fontSize="18px">{exchangeRate}</Text>
      <Text fontSize="16px" color="grey">
        Gas Fee: ~{gasFee}
      </Text>
    </Box>
  );
};

export default Fee;
