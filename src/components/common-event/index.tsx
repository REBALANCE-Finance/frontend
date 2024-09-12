"use client";
import { useEffect } from "react";
import { useAnalyticsEventTracker } from "@/hooks/useAnalyticsEventTracker";

const CommonEvent = () => {
  const event = useAnalyticsEventTracker();

  useEffect(() => {
    event({
      action: "App_visited",
      label: "App visited"
    });
  }, []);

  return <></>;
};

export default CommonEvent;
