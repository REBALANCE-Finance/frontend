import { Flex, Text } from "@chakra-ui/react";
import { TooltipProps } from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

export const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <Flex w="255px" p="10px" gap="10px" flexDirection="column" bg="black.60" borderRadius="4px">
        {payload?.map((e, i) => (
          <Flex flexDirection="column" key={i}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text variant="regular14">
                {e.name} {Number(e?.value)?.toFixed(2)} %
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  }

  return null;
};
