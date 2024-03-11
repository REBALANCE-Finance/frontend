import { useMediaQuery } from "@chakra-ui/react";
import React, { FC } from "react";
import {
  AreaChart as AreaChartDefault,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { MEDIA_QUERY_MAX } from "../../consts";
import { themes } from "../../themes";
import { CustomTooltip } from "./components/CustomTooltip";
import { IAreaChartProps } from "./types";

export const AreaChart: FC<IAreaChartProps> = ({
  data,
  gradient,
  lines,
  tickFormatter,
  legend
}) => {
  const [media] = useMediaQuery(MEDIA_QUERY_MAX);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChartDefault
        data={data}
        margin={{
          top: 0,
          right: 10,
          left: !media ? -30 : 0,
          bottom: 0
        }}
      >
        {gradient}
        <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
        {legend}
        <Tooltip cursor={{ opacity: 0.1, strokeWidth: 1 }} content={<CustomTooltip />} />
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
          tickSize={5}
          tickLine={false}
          fontSize={themes.fontSizes.sm}
          stroke={themes.colors.darkGray}
        />
        {lines}
      </AreaChartDefault>
    </ResponsiveContainer>
  );
};
