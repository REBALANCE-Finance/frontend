import { useCallback } from "react";

type GTagEvent = {
  action: string;
  label: string;
  value?: string | number;
};

export const useAnalyticsEventTracker = () => {
  const eventTracker = useCallback(({ action, label, value }: GTagEvent) => {
    // Ensure this runs only in the browser and `gtag` is available
    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", action, {
        event_label: label,
        value
      });
    } else {
      console.warn("Google Analytics is not loaded");
    }
  }, []);

  return eventTracker;
};
