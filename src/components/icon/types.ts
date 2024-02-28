import { HTMLAttributes } from "react";

export enum EnumSizes {
  sm = "16px",
  md = "24px"
}

export type Sizes = keyof typeof EnumSizes;

export interface TIconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: string;
  size?: Sizes | string;
  width?: string;
  height?: string;
}
