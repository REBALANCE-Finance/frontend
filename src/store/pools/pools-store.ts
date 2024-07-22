import { action, makeObservable, observable, runInAction } from "mobx";
import { getPools } from "../../api/pools/queries";
import { IPoolData } from "./types";

class PoolsStore {
  pools: IPoolData[] = [];
  isLoading = false;
  error: Error | null = null;
  interval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    makeObservable(this, {
      pools: observable,
      isLoading: observable,
      error: observable,
      fetchPools: action,
      startPolling: action,
      stopPolling: action,
      setError: action
    });
  }

  setError = (error: Error | null) => {
    this.error = error;
  };

  fetchPools = async (type: "lending" | "borrowing"): Promise<void> => {
    if (this.isLoading) return;

    this.isLoading = true;
    this.setError(null);

    try {
      const data: IPoolData[] = await getPools(type);
      runInAction(() => {
        this.pools = data;
      });
    } catch (error) {
      runInAction(() => {
        this.setError(error as Error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  };

  startPolling = (type: "lending" | "borrowing" = "lending") => {
    this.fetchPools(type);
    this.interval = setInterval(() => this.fetchPools(type), 60000);
  };

  stopPolling = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  };
}

export default PoolsStore;
