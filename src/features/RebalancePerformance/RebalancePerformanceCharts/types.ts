import { PERFORMANCE_TYPE } from "../../../consts/performance-type";

export interface IRebalancePerformanceProps {
  activeType: PERFORMANCE_TYPE | string;
}

export interface ILegendAreaChart {
  text: string;
  color: string;
}

export interface IAreaLineProps {
  name: string;
  type: PERFORMANCE_TYPE;
}
