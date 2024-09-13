import { useCallback } from "react";

type GTagEvent = {
  action: string;
  label: string;
  value?: string | number;
};

export const useAnalyticsEventTracker = () => {
  const eventTracker = useCallback(({ action, label, value }: GTagEvent) => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event",action);
    } else {
      console.warn("Google Tag Manager is not loaded");
    }
  }, []);

  return eventTracker;
};
