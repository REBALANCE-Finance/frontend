import { PERFORMANCE_TYPE } from "../utils";

export interface IRebalancePerformanceProps {
  activeType: keyof typeof PERFORMANCE_TYPE | string;
}

export interface ILegendAreaChart {
  text: string;
  color: string;
}
