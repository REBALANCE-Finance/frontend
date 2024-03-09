import { createContext } from "react";

import { ModalContextStore } from "./modal/modal-context-store";
import { ModalStore } from "./modal/modal-store";
import PoolsStore from "./pools/pools-store";
interface IStore {
  modalStore: ModalStore;
  modalContextStore: ModalContextStore;
  poolsStore: PoolsStore;
}

export const stores: IStore = Object.freeze({
  modalStore: new ModalStore(),
  modalContextStore: new ModalContextStore(),
  poolsStore: new PoolsStore()
});

export const storesContext = createContext<IStore>(stores);
export const StoresProvider = storesContext.Provider;
