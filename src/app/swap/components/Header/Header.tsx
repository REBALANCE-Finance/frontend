"use client";
import Icon from "@/components/icon";
import { ICON_NAMES } from "@/consts";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { ellipsis } from "@/utils";
import { Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { useAccount } from "wagmi";

type HeaderProps = {
  onRefetch: VoidFunction;
};

const Header = ({ onRefetch }: HeaderProps) => {
  const { address } = useAccount();
  const copy = useCopyToClipboard();

  const handleCopyAddress = () => {
    copy(address as string);
  };

  return (
    <Flex justify="space-between" alignItems="center">
      <Text fontSize="22px">Swap</Text>
      {address && (
        <Text
          marginLeft="auto"
          marginRight="24px"
          textStyle="textMono16"
          color="darkgray"
          alignContent="center"
        >
          {ellipsis(String(address))}
        </Text>
      )}
      <Box display="flex" alignItems="center" gap="12px">
        <IconButton
          aria-label="copy"
          icon={<Icon name={ICON_NAMES.copy} />}
          onClick={handleCopyAddress}
          isDisabled={!address}
        />
        <IconButton
          aria-label="update"
          icon={<Icon name={ICON_NAMES.update} />}
          onClick={onRefetch}
        />
        <IconButton aria-label="settings" icon={<Icon name={ICON_NAMES.settings} />} isDisabled />
      </Box>
    </Flex>
  );
};

export default Header;
