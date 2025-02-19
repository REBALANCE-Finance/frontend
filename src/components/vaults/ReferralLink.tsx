"use client";
import { Button, Flex, Text } from "@chakra-ui/react";
import { FC, useState } from "react";

type ReferralLinkProps = {
  link: string;
};

const ReferralLink: FC<ReferralLinkProps> = ({ link }) => {
  const [isCopied, setIsCopied] = useState(false);

  const onCopyLink = () => {
    navigator.clipboard.writeText(link);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const btnTitle = isCopied ? "copied" : "copy";

  return (
    <Flex flexDir="column" gap={4} w="inherit">
      <Text fontSize="14px" color="black.5">
        Referral link
      </Text>

      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        padding={[2.5, 2]}
        border="1px solid #1E1E1E"
        borderRadius="4px"
        gap={4}
      >
        <Text fontSize="16px" fontWeight={500} fontFamily="mono">
          {link}
        </Text>

        <Button
          padding={[1, 2]}
          bg="#4CFF94CC"
          color="black.100"
          w="max-content"
          onClick={onCopyLink}
          h="max-content"
        >
          {btnTitle}
        </Button>
      </Flex>
    </Flex>
  );
};

export default ReferralLink;
