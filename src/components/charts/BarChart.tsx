import React, { FC } from "react";
import {
  BarChart as BarChartDefault,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { themes } from "../../themes";
import { CustomTooltip } from "./components/CustomTooltip";
import { IBarChart } from "./types";

const defaultData = Array.from({ length: 30 }, (_, i) => (i + 1).toString());

export const BarChart: FC<IBarChart> = ({
  data,
  reversed = false,
  bar,
  hideX = false,
  tickFormatter
}) => {
  const isEmptyData = data.length === 0;

  const finalyData = isEmptyData ? defaultData : data;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChartDefault width={730} height={250} data={finalyData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} horizontal={false} opacity={0.2} />
        <XAxis
          hide={hideX}
          dataKey="date"
          axisLine={false}
          tickLine={false}
          minTickGap={1}
          fontSize={themes.fontSizes.sm}
          color={themes.colors.darkGray}
          tickFormatter={tickFormatter}
        />
        <YAxis hide axisLine={false} tickSize={5} tickLine={false} reversed={reversed} />
        <Tooltip cursor={false} offset={30} content={<CustomTooltip />} />
        {bar}
      </BarChartDefault>
    </ResponsiveContainer>
  );
};
