import { Flex, Text } from "@chakra-ui/react";
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
            <Flex alignItems="center" justifyContent="space-between">
              <Text variant="regular14">
                {!!name ? e.name : null} {Number(e?.value)?.toFixed(2)} %
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  }

  return null;
};
