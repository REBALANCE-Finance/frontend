import React, { FC } from "react";
import {
  AreaChart as AreaChartDefault,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

import { IAreaChartProps } from "./types";

export const AreaChart: FC<IAreaChartProps> = ({
  data,
  gradient,
  lines,
  tickFormatter,
  legend
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChartDefault
        data={data}
        margin={{
          top: 0,
          right: 10,
          left: 0,
          bottom: 0
        }}
      >
        {gradient}
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
        {legend}
        <XAxis
          dataKey="date"
          tickLine={false}
          tickSize={10}
          interval="preserveStartEnd"
          tickFormatter={tickFormatter}
          axisLine={false}
        />
        <YAxis axisLine={false} tickSize={5} tickLine={false} />
        {lines}
      </AreaChartDefault>
    </ResponsiveContainer>
  );
};
