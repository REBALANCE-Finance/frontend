import React, { FC } from "react";

import { PERFORMANCE_TYPE } from "../utils";
import { BorrowChart } from "./BorrowChart";
import { LendChart } from "./LendChart";
import { IRebalancePerformanceProps } from "./types";

export const PerformanceChart: FC<IRebalancePerformanceProps> = ({ activeType }) => {
  if (activeType === PERFORMANCE_TYPE.lending) {
    return <LendChart />;
  }

  if (activeType === PERFORMANCE_TYPE.borrowing) {
    return <BorrowChart />;
  }

  return null;
};
