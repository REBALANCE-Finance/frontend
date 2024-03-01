import { createContext } from "react";

import { ModalContextStore } from "./modal/modal-context-store";
import { ModalStore } from "./modal/modal-store";

export const stores = Object.freeze({
  modalStore: new ModalStore(),
  modalContextStore: new ModalContextStore()
});

export const storesContext = createContext(stores);
export const StoresProvider = storesContext.Provider;
