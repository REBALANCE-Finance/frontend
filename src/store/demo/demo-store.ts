import { action, makeObservable, observable } from "mobx";

class DemoStore {
  isDemoMode = false;

  constructor() {
    makeObservable(this, {
      isDemoMode: observable,
      setDemoMode: action,
      toggleDemoMode: action
    });
    
    // Load from localStorage on initialization
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("demoMode");
      this.isDemoMode = saved === "true";
    }
  }

  setDemoMode = (value: boolean) => {
    this.isDemoMode = value;
    if (typeof window !== "undefined") {
      localStorage.setItem("demoMode", String(value));
    }
  };

  toggleDemoMode = () => {
    this.setDemoMode(!this.isDemoMode);
  };
}

export default DemoStore;

