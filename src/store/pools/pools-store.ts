import { action, makeObservable, observable } from "mobx";

import { getPools } from "../../api/pools/queries";
import { IPoolData } from "./types";

class PoolsStore {
  pools: IPoolData[] = [];
  isLoading: boolean = false;
  error: Error | null = null;

  constructor() {
    makeObservable(this, {
      pools: observable,
      isLoading: observable,
      error: observable,
      fetchPools: action,
    });
  }

  async fetchPools(type: "lending" | "borrowing"): Promise<void> {
    if (this.isLoading) return;
    this.isLoading = true;
    this.error = null;
    try {
      const data: IPoolData[] = await getPools(type);
      this.pools = data;
    } catch (error) {
      this.error = error as Error;
    } finally {
      this.isLoading = false;
    }
  }
}

export default PoolsStore;