import { Button, useMediaQuery } from "@chakra-ui/react";
import React from "react";
import { isMobile } from "react-device-detect";

import { MEDIA_QUERY_MAX } from "../../consts";
import { useStore } from "@/hooks/useStoreContext";
import { ModalEnum } from "@/store/modal/types";

export const ConnectWallet = ({
  title,
  variant,
  minHeight,
  className
}: {
  title?: string;
  variant?: string;
  minHeight?: string;
  className?: string;
}) => {
  const { openModal } = useStore("modalStore");
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);

  const onOpenConnectWalletModal = () => {
    openModal({
      // @ts-ignore
      type: ModalEnum.ConnectWallet
    });
  };

  if (media) {
    return (
      <Button
        p={variant ? "16px 24px" : 0}
        onClick={onOpenConnectWalletModal}
        variant={variant ? variant : title === "Deposit" ? "primaryFilled" : ""}
        flex="1 1 0"
        width={variant ? "100%" : "auto"}
        className={className}
      >
        {title ? title : "Connect wallet"}
      </Button>
    );
  }

  return (
    <Button
      onClick={onOpenConnectWalletModal}
      variant={variant ? variant : title === "Deposit" ? "primaryFilled" : ""}
      flex="1 1 0"
      width={variant ? "100%" : "auto"}
      mt={variant ? 4 : 0}
      h={variant ? "52px" : "auto"}
      minH={minHeight}
      className={className}
      _hover={{
        opacity: 0.8
      }}
    >
      {title ? title : "Connect wallet"}
    </Button>
  );
};
