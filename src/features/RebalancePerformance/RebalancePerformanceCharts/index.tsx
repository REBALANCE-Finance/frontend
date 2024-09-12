import React, { FC } from "react";

import { ROUTES_TYPE } from "../../../consts/routes-type";
import { BorrowChart } from "./BorrowChart";
import { LendChart } from "./LendChart";
import { IRebalancePerformanceProps } from "./types";

export const PerformanceChart: FC<IRebalancePerformanceProps> = ({
  activeType,
  chartData,
  showRightAxis
}) => {
  if (activeType === "earn") {
    return <LendChart chartData={chartData} showRightAxis={showRightAxis} />;
  }

  if (activeType === ROUTES_TYPE.borrowing) {
    return <BorrowChart />;
  }

  return null;
};
