import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

interface CustomTooltipProps extends TooltipProps<ValueType, NameType> {
  name?: boolean | undefined;
}

export const CustomTooltip = ({ active, payload, name }: CustomTooltipProps) => {
  
  if (active) {
    return (
      <Flex w="max-content" p="10px" gap="10px" flexDirection="column" bg="black.60" borderRadius="4px">
        {payload?.map((e, i) => (
          <Flex flexDirection="column" key={i}>
            <Flex alignItems="flex-start" justifyContent="space-between" flexDirection={'column'}>
              <Text variant="regular14">
                {!!name ? e.name : null} {Number(e?.value)?.toFixed(2)} %
              </Text>
              <Text variant="regular14">
                {dayjs(e?.payload?.date).format("MMM DD, YYYY")}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  }

  return null;
};
