import { action, makeObservable, observable, runInAction } from "mobx";
import { getPools } from "../../api/pools/queries";
import { IPoolData } from "../pools/types";

class PoolStore {
  activePool: IPoolData | null = null;
  isLoading: boolean = false;
  error: Error | null = null;

  constructor() {
    makeObservable(this, {
      activePool: observable,
      isLoading: observable,
      error: observable,
      setActivePool: action.bound,
      resetActivePool: action,
      setError: action,
      setLoading: action,
      fetchAndSetActivePool: action.bound
    });
  }

  setActivePool(pool: IPoolData) {
    this.activePool = pool;
  }

  resetActivePool() {
    this.activePool = null;
  }

  setError(error: Error | null) {
    this.error = error;
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  async fetchAndSetActivePool(type: "lending" | "borrowing", poolName: string) {
    this.setLoading(true);
    this.setError(null);
    try {
      const pools: IPoolData[] = await getPools(type);
      runInAction(() => {
        const foundPool = pools.find(pool => pool.token === poolName);
        if (foundPool) {
          this.setActivePool(foundPool);
        } else {
          this.setError(new Error(`Pool with name ${poolName} not found`));
        }
      });
    } catch (error) {
      runInAction(() => {
        this.setError(error as Error);
      });
    } finally {
      runInAction(() => {
        this.setLoading(false);
      });
    }
  }
}

export default PoolStore;
