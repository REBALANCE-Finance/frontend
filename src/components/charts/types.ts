import { XAxisProps, YAxisProps } from "recharts";

export interface IChartProps {
  data: unknown[];
}

export interface IAreaChartProps extends IChartProps {
  gradient: JSX.Element;
  lines: JSX.Element[];
  tickFormatter?: XAxisProps["tickFormatter"];
  legend?: JSX.Element | null;
  tooltipName?: boolean ;
}

export interface IBarChart extends IChartProps {
  reversed?: YAxisProps["reversed"];
  bar: JSX.Element;
  hideX?: XAxisProps["hide"];
  hideY?: YAxisProps["hide"];
  tickFormatter?: XAxisProps["tickFormatter"];
}

export interface IBar {
  data: Record<string, unknown>[];
  color: string | Record<string, string>;
}

export const isColorString = (x: string | object): x is string => {
  return typeof x === "string";
};
