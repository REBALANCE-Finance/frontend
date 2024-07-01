import React, { FC } from "react";
import {
  AreaChart as AreaChartDefault,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { themes } from "../../themes";
import { CustomTooltip } from "./components/CustomTooltip";
import { IAreaChartProps } from "./types";

export const AreaChart: FC<IAreaChartProps> = ({
  data,
  gradient,
  lines,
  tickFormatter,
  legend,
  tooltipName,
  isLending
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChartDefault
        data={data}
        margin={{
          top: 0,
          right: 10,
          left: -25,
          bottom: 0
        }}
      >
        {gradient}
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
        {legend}
        <Tooltip
          cursor={{ opacity: 0.1, strokeWidth: 1 }}
          content={<CustomTooltip name={tooltipName} isLending={isLending} />}
        />
        <XAxis
          dataKey="date"
          tickLine={false}
          tickSize={10}
          interval="preserveStartEnd"
          tickFormatter={tickFormatter}
          axisLine={false}
          stroke={themes.colors.darkGray}
          fontSize={themes.fontSizes.sm}
        />
        <YAxis
          axisLine={false}
          yAxisId={0}
          tickSize={5}
          tickLine={false}
          fontSize={themes.fontSizes.sm}
          stroke={themes.colors.darkGray}
          tickFormatter={(e: string) => `${e} %`}
        />
        <YAxis
          yAxisId={1}
          orientation="right"
          dataKey="hardcodedLine"
          axisLine={false}
          tickLine={false}
          axisType="yAxis"
          fontSize={themes.fontSizes.sm}
          stroke={themes.colors.darkGray}
          tickFormatter={(e: string) => `$${e}`}
          allowDataOverflow
        />
        {lines}
      </AreaChartDefault>
    </ResponsiveContainer>
  );
};
