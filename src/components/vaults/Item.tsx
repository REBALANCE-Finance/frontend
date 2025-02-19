import { Button, Divider, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import ReferralLink from "./ReferralLink";
import { IVaultInfo } from "@/types";
import VaultInfo from "./info";

type VaultItemProps = {
  imageUrl: string;
  referralLink: string;
  info: IVaultInfo;
  onAddMore: VoidFunction;
};

const VaultItem: FC<VaultItemProps> = ({ imageUrl, referralLink, info, onAddMore }) => {
  return (
    <Flex gap="44px" width="100%">
      <Image
        src={imageUrl}
        width={343}
        height={343}
        alt="vault"
        style={{
          flexShrink: 0,
          maxHeight: 343,
          maxWidth: 343
        }}
      />

      <Flex flexDir="column" my={6} gap={4} width="inherit">
        <ReferralLink link={referralLink} />
        <Divider />
        <VaultInfo {...info} />
        <Divider />
        <Button
          height="44px"
          minW="190px"
          bg="white"
          borderRadius="4px"
          color="black.100"
          onClick={onAddMore}
        >
          Add more
        </Button>
      </Flex>
    </Flex>
  );
};

export default VaultItem;
