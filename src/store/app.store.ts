'use client'

import { createContext } from "react";

import { ModalContextStore } from "./modal/modal-context-store";
import { ModalStore } from "./modal/modal-store";
import PoolsStore from "./pools/pools-store";
import PoolStore from "./pool/pool-store";
import DemoStore from "./demo/demo-store";

interface IStore {
  modalStore: ModalStore;
  modalContextStore: ModalContextStore;
  poolsStore: PoolsStore;
  poolStore: PoolStore;
  demoStore: DemoStore;
}

export const stores: IStore = Object.freeze({
  modalStore: new ModalStore(),
  modalContextStore: new ModalContextStore(),
  poolsStore: new PoolsStore(),
  poolStore: new PoolStore(),
  demoStore: new DemoStore(),
});

export const storesContext = createContext<IStore>(stores);
export const StoresProvider = storesContext.Provider;
