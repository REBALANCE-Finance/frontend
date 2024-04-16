import { action, makeObservable, observable } from "mobx";
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
    });
    this.startPolling("lending");  // Explicitly pass "lending" or "borrowing"
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

  startPolling(type: "lending" | "borrowing" = "lending") {
    this.stopPolling();  // Stop any existing polling first
    this.interval = setInterval(() => this.fetchPools(type), 10000);  // Set the interval for 10 seconds
  }

  stopPolling() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  dispose() {  // Cleanup method to clear the interval when the store is no longer needed
    this.stopPolling();
  }
}

export default PoolsStore;