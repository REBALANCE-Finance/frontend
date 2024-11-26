import { MEDIA_QUERY_MAX } from "@/consts";
import { Flex, Text, useMediaQuery } from "@chakra-ui/react";
import Image from "next/image";
import { useMemo } from "react";
import { useConnect } from "wagmi";

const ConnectSocials = () => {
  const { connectors, connectAsync } = useConnect();
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);

  const magicConnector = useMemo(() => {
    return connectors.find(connector => connector.id === "magic");
  }, [connectors]);

  const onOpenModal = async () => {
    if (!magicConnector) return;
    try {
      await connectAsync({ connector: magicConnector });
    } catch (error) {
      console.error("Failed to connect Magic:", error);
    }
  };

  return (
    <Flex
      gap="4px"
      height={media ? "28px" : "32px"}
      px={media ? "4px" : "16px"}
      bg="#DEDEDE"
      borderRadius="4px"
      cursor="pointer"
      alignItems="center"
      onClick={onOpenModal}
    >
      <Text color="black.40" fontSize="14px" fontWeight={500}>
        Connect socials
      </Text>
      <Flex gap="4px">
        <Image src="/assets/image/socials/Twitter.svg" width={16} height={16} alt="twitter" />
        <Image src="/assets/image/socials/Google.svg" width={16} height={16} alt="twitter" />
      </Flex>
    </Flex>
  );
};

export default ConnectSocials;
