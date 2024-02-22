import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

import BannerImage from "../../assets/image/Banner.svg";

export const AppBanner = () => {
  return (
    <Flex h="240px" w="100%" bg="black.70" mb="44px" justify="center">
      <Flex gap="44px" maxW={"1300px"} w="100%" px={{ base: "16px", xxl: "0" }}>
        <Image src={BannerImage} />
        <Flex direction="column" gap="24px" justify="center" alignItems="start">
          <Flex direction="column" gap="16px">
            <Text textStyle="h1">Early-depositor’s programme</Text>
            <Text textStyle="h2">Join now and get Rebalance Club NFT, with unique utilities</Text>
            <Text fontWeight="500">NFTs minted: 126 / 256</Text>
          </Flex>
          <Button variant="primaryWhite">Join & Mint NFT</Button>
        </Flex>
      </Flex>
    </Flex>
  );
};
