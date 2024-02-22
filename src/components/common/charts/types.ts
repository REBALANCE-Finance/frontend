export interface IChartProps {
  data: unknown[];
}

export interface IAreaChartProps extends IChartProps {
  gradient: JSX.Element;
  lines: JSX.Element[];
  tickFormatter?: (value: string) => string;
  legend?: JSX.Element | null;
}

export interface IBarChart extends IChartProps {}
