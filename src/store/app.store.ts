import { createContext } from "react";

import { ModalStore } from "./modal/modal-store";

export const stores = Object.freeze({
  modalStore: new ModalStore()
});

export const storesContext = createContext(stores);
export const StoresProvider = storesContext.Provider;
