import { action, makeObservable, observable, runInAction, toJS } from "mobx";
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
      setLoading: action
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
}

export default PoolStore;
