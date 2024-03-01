import { Box, Flex, Image, Text } from "@chakra-ui/react";
import numeral from "numeral";
import React, { FC } from "react";

interface RebalncePerformanceCardProps {
  image: string;
  title: string;
  subtitle: string;
  info: Record<string, string>[];
  isActive: boolean;
}

export const RebalancePerformanceCard: FC<RebalncePerformanceCardProps> = ({
  image,
  title,
  subtitle,
  info,
  isActive
}) => {
  return (
    <Flex
      bg={isActive ? "black.80" : undefined}
      w="631px"
      borderRadius="4px"
      position="relative"
      _before={
        isActive
          ? {
              content: `""`,
              borderLeftRadius: "4px",
              w: "4px",
              h: "100%",
              position: "absolute",
              bg: "greenAlpha.100",
              zIndex: 5
            }
          : {}
      }
    >
      <Image src={image} filter={`grayscale(${isActive ? 0 : 1})`} borderLeftRadius="4px" />

      <Flex direction="column" p="24px" gap="8px" w="100%">
        <Flex justify="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="500">
            {title}
          </Text>

          <Box
            borderRadius="2px"
            border="2px solid"
            borderColor={`${isActive ? "greenAlpha.100" : "black.40"}`}
            transform="rotate(135deg)"
            boxShadow={`${isActive ? "inset 2px 2px 10px #0B4121" : undefined} `}
            w="18px"
            h="18px"
          ></Box>
        </Flex>

        <Text fontSize="sm" fontWeight="500">
          {subtitle}
        </Text>

        <Flex gap="12px">
          {info.map(el => (
            <Flex key={el.label} alignItems="center" fontSize="xs" color="black.20" gap="7px">
              <Text fontWeight="400" color="darkGray">
                {el.label}:
              </Text>
              <Text fontWeight="500" color="darkGray">
                ${numeral(el.value).format("0,0")}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
