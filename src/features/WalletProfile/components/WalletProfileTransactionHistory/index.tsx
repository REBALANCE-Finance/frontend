import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";

import Icon from "../../../../components/icon";
import { ICON_NAMES } from "../../../../consts";
import { TransactionHistory } from "./components/TransactionHistory";

const mockTrxData = [
  {
    type: "deposit",
    status: "completed",
    value: "100000",
    hash: "0x3180e352ee78c0658cefb209ca005727e97347e469bf08a995ef90ff3fbd0753",
    time: 1708982932190
  },
  {
    type: "withdrawal",
    status: "proccess",
    value: "2000",
    hash: "0x3180e352ee78c0658cefb209ca005727e97347e469bf08a995ef90ff3fbd0753",
    time: 1708982932190
  },
  {
    type: "deposit",
    status: "rejected",
    value: "10",
    hash: "0x3180e352ee78c0658cefb209ca005727e97347e469bf08a995ef90ff3fbd0753",
    time: 1708982932190
  },
  {
    type: "withdrawal",
    status: "completed",
    value: "1223",
    hash: "0x3180e352ee78c0658cefb209ca005727e97347e469bf08a995ef90ff3fbd0753",
    time: 1708982932190
  },
  {
    type: "deposit",
    status: "completed",
    value: "100000",
    hash: "0x3180e352ee78c0658cefb209ca005727e97347e469bf08a995ef90ff3fbd0753",
    time: 1708982932190
  },
  {
    type: "withdrawal",
    status: "proccess",
    value: "2000",
    hash: "0x3180e352ee78c0658cefb209ca005727e97347e469bf08a995ef90ff3fbd0753",
    time: 1708982932190
  },
  {
    type: "deposit",
    status: "rejected",
    value: "10",
    hash: "0x3180e352ee78c0658cefb209ca005727e97347e469bf08a995ef90ff3fbd0753",
    time: 1708982932190
  },
  {
    type: "withdrawal",
    status: "completed",
    value: "1223",
    hash: "0x3180e352ee78c0658cefb209ca005727e97347e469bf08a995ef90ff3fbd0753",
    time: 1708982932190
  },
  {
    type: "deposit",
    status: "completed",
    value: "100000",
    hash: "0x3180e352ee78c0658cefb209ca005727e97347e469bf08a995ef90ff3fbd0753",
    time: 1708982932190
  },
  {
    type: "withdrawal",
    status: "proccess",
    value: "2000",
    hash: "0x3180e352ee78c0658cefb209ca005727e97347e469bf08a995ef90ff3fbd0753",
    time: 1708982932190
  },
  {
    type: "deposit",
    status: "rejected",
    value: "10",
    hash: "0x3180e352ee78c0658cefb209ca005727e97347e469bf08a995ef90ff3fbd0753",
    time: 1708982932190
  },
  {
    type: "withdrawal",
    status: "completed",
    value: "1223",
    hash: "0x3180e352ee78c0658cefb209ca005727e97347e469bf08a995ef90ff3fbd0753",
    time: 1708982932190
  }
];

export const WalletProfileTransactionHistory = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const previewTransaction = mockTrxData.filter((_, i) => i <= 2);

  return (
    <Flex direction="column" p="12px 16px" bg="black.70" borderRadius="4px" gap="21px">
      <Flex as={Button} align="center" justify="space-between" onClick={onOpen}>
        <Text fontWeight="500">Transaction History</Text>
        <Icon name={ICON_NAMES.chevronRight} />
      </Flex>

      {previewTransaction.map((props, i) => (
        <TransactionHistory key={i} {...props} />
      ))}

      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader as={Flex} align="center" gap="4px">
            <Icon
              style={{cursor: "pointer"}}
              aria-label="back"
              name={ICON_NAMES.close}
              size="36px"
              onClick={onClose}
            />
            <Text>Transaction History</Text>
          </DrawerHeader>
          <DrawerBody as={Flex} direction="column" gap="24px">
            {mockTrxData.map((props, i) => (
              <TransactionHistory key={i} {...props} />
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
