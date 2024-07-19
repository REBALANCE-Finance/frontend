import { action, makeObservable, observable, runInAction } from "mobx";
import { getPools } from "../../api/pools/queries";
import { IPoolData } from "./types";

class PoolsStore {
  pools: IPoolData[] = [];
  isLoading: boolean = false;
  error: Error | null = null;
  interval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    makeObservable(this, {
      pools: observable,
      isLoading: observable,
      error: observable,
      fetchPools: action,
      startPolling: action,
      stopPolling: action
    });
    this.startPolling("lending"); // Explicitly pass "lending" or "borrowing"
  }

  async fetchPools(type: "lending" | "borrowing"): Promise<void> {
    if (this.isLoading) return;
    this.isLoading = true;
    this.error = null;
    try {
      const data: IPoolData[] = await getPools(type);
      runInAction(() => {
        this.pools = data;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error as Error;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  startPolling(type: "lending" | "borrowing" = "lending") {
    this.fetchPools(type);
    this.interval = setInterval(() => this.fetchPools(type), 60000); // Poll every 60 seconds
  }

  stopPolling() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}

export default PoolsStore;
