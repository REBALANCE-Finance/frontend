"use client";

import Icon from "@/components/icon";
import { ICON_NAMES } from "@/consts";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { ellipsis } from "@/utils";
import { Box, IconButton, Text } from "@chakra-ui/react";
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
    <Box display="flex" alignContent="center">
      <Text fontSize="22px">Swap</Text>
      <Text
        marginLeft="auto"
        marginRight="24px"
        textStyle="textMono16"
        color="darkgray"
        alignContent="center"
      >
        {ellipsis(String(address))}
      </Text>
      <Box display="flex" alignItems="center" gap="12px">
        <IconButton
          aria-label="copy"
          icon={<Icon name={ICON_NAMES.copy} />}
          onClick={handleCopyAddress}
        />
        <IconButton
          aria-label="update"
          icon={<Icon name={ICON_NAMES.update} />}
          onClick={onRefetch}
        />
        <IconButton aria-label="settings" icon={<Icon name={ICON_NAMES.settings} />} isDisabled />
      </Box>
    </Box>
  );
};

export default Header;
