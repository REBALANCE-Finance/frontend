import { PERFORMANCE_TYPE } from "../utils";

export interface IRebalancePerformanceProps {
  activeType: keyof typeof PERFORMANCE_TYPE;
}

export interface ILegendAreaChart {
  text: string;
  color: string;
}
