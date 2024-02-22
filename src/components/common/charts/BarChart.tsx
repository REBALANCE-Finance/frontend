import React, { FC } from "react";
import {
  Bar,
  BarChart as BarChartDefault,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts";

import { IBarChart } from "./types";

export const BarChart: FC<IBarChart> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChartDefault width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} opacity={0.2} />
        <XAxis
          hide
          dataKey="date"
          axisLine={false}
          tickLine={false}
          minTickGap={1}
          fontSize="6px"
        />
        <YAxis hide axisLine={false} tickSize={5} tickLine={false} />
        <Bar
          key={1}
          maxBarSize={20}
          minPointSize={5}
          dataKey="lending"
          fill="rgba(76, 255, 148, 0.8)"
          background={{ fill: "#272A30" }}
        >
          {data.map((elem, index) => (
            <Cell cursor="pointer" key={`cell-${index}`} radius={10} />
          ))}
        </Bar>
      </BarChartDefault>
    </ResponsiveContainer>
  );
};
