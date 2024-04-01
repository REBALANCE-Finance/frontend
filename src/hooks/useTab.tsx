'use client'

import { useState } from "react";

export const useTab = (defaultIndex: number) => {
  const [tabIndex, setTabIndex] = useState(defaultIndex);

  const handleTab = (index: number) => {
    setTabIndex(index);
  };

  return {
    tabIndex,
    handleTab
  };
};
