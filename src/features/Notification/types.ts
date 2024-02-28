import { DrawerProps } from "@chakra-ui/react";

export interface INotificationProps {
  isOpen: DrawerProps["isOpen"];
  onClose: DrawerProps["onClose"];
}
