import { action, makeObservable, observable, runInAction } from "mobx";
import { getPools } from "../../api/pools/queries";
import { IPoolData } from "./types";

class PoolsStore {
  pools: IPoolData[] = [];
  isLoading = false;
  isFetched = false;
  error: Error | null = null;
  interval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    makeObservable(this, {
      pools: observable,
      isLoading: observable,
      isFetched: observable,
      error: observable,
      fetchPools: action,
      startPolling: action,
      stopPolling: action,
      setError: action,
      setIsFetched: action
    });
  }

  setError = (error: Error | null) => {
    this.error = error;
  };

  setIsFetched = (isFetched: boolean) => {
    runInAction(() => {
      this.isFetched = isFetched;
    });
  };

  fetchPools = async (type: "lending" | "borrowing"): Promise<void> => {
    if (this.isLoading) return;

    this.isLoading = true;
    this.setError(null);

    try {
      const data: IPoolData[] = await getPools(type);
      const sortedData = data.sort((a, b) => {
        if (a.token === "wETH") return 1;
        if (b.token === "wETH") return -1;
        return 0;
      });
      runInAction(() => {
        this.pools = sortedData;
        this.isFetched = true;
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
