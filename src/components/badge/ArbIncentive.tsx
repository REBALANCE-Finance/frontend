import { Flex, Text, Image } from "@chakra-ui/react";

type ArbIncentiveProps = {
  size: "small" | "large";
};

const ArbIncentive = ({ size }: ArbIncentiveProps) => {
  const imgSize = size === "small" ? "16px" : "24px";

  return (
    <Flex
      justify="center"
      alignItems="center"
      gap="4px"
      padding={size === "small" ? "4px 8px" : "8px 16px"}
      borderRadius="100px"
      bg="greenAlpha.100"
      pointerEvents="none"
      userSelect="none"
    >
      <Image src="/assets/icons/arbitrum-icon.svg" h={imgSize} w={imgSize} alt="arb" />
      <Text
        textStyle={size === "small" ? "text14" : "text16"}
        color="black.100"
        fontWeight={700}
        lineHeight="14px"
      >
        ARB incentive
      </Text>
    </Flex>
  );
};

export default ArbIncentive;
