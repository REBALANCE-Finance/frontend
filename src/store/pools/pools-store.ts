import { action, makeObservable, observable, runInAction } from "mobx";
import { getPools } from "../../api/pools/queries";
import { IPoolData } from "./types";
import { ICHAIN } from "@/types";

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

  fetchPools = async (type: "lending" | "borrowing", network: ICHAIN): Promise<void> => {
    if (this.isLoading) return;

    this.isLoading = true;
    this.setError(null);

    try {
      const data: IPoolData[] = await getPools(type, network);
      const sortedData = data.sort((a, b) => {
        if (a.token === "FRAX") return -1;
        if (b.token === "FRAX") return 1;

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

  startPolling = (type: "lending" | "borrowing" = "lending", network: ICHAIN) => {
    this.fetchPools(type, network);
    this.interval = setInterval(() => this.fetchPools(type, network), 60000);
  };

  stopPolling = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  };
}

export default PoolsStore;
