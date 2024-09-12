import { IAreaChartData } from "@/api/pools/types";
import { ROUTES_TYPE } from "../../../consts/routes-type";

export interface IRebalancePerformanceProps {
  activeType: ROUTES_TYPE | string;
  chartData: IAreaChartData;
  showRightAxis?: boolean;
}

export interface ILegendAreaChart {
  text: string;
  color: string;
}

export interface IAreaLineProps {
  name: string;
  type: ROUTES_TYPE;
}
