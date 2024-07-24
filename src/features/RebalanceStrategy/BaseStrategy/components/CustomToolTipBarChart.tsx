import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export const CustomTooltipBarChart = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <Flex w="200px" p="8px" gap="10px" flexDirection="column" bg="black.60" borderRadius="4px">
        {payload?.map((e, i) => (
          <Flex flexDirection="column" key={i}>
            <Text variant="regular14" color="darkgray">
              {dayjs(e?.payload?.name).format("MMM DD, YYYY")}
            </Text>
            <Flex alignItems="center" justifyContent="space-between">
              <Text variant="regular14">Earned</Text>
              <Text variant="regular14">$ {Number(e?.value)?.toFixed(2)}</Text>
            </Flex>
            <Flex alignItems="center" justifyContent="space-between">
              <Text variant="regular14">APY</Text>
              <Text variant="regular14">{Number(e?.payload.apr)?.toFixed(2)} %</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  }

  return null;
};
