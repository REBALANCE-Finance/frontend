import { useCallback } from "react";

type GTagEvent = {
  action: string;
  label: string;
  value?: string | number;
};

export const useAnalyticsEventTracker = () => {
  const eventTracker = useCallback(({ action, label, value }: GTagEvent) => {
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: action,
        event_name: label
      });
    } else {
      console.warn("Google Tag Manager is not loaded");
    }
  }, []);

  return eventTracker;
};
