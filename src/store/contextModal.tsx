import { useDisclosure } from "@chakra-ui/react";
import { createContext, FC, PropsWithChildren, useContext, useState } from "react";

import { ContextModalComponent } from "../features/modals/context-modal";

interface IContextModal {
  openModal: ({ type }: { type: string }) => void;
}

export const ContextModal = createContext({} as IContextModal);

export const ContextModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [type, setType] = useState("");
  const openModal = ({ type }: { type: string }) => {
    setType(type);
    onOpen();
  };
  return (
    <ContextModal.Provider value={{ openModal }}>
      <ContextModalComponent isOpen={isOpen} onClose={onClose} type={type} />
      {children}
    </ContextModal.Provider>
  );
};

export const useContextModal = () => {
  const context = useContext(ContextModal);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
