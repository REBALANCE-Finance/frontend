import { HTMLAttributes } from "react";

export enum EnumSizes {
  sm = "16px",
  md = "24px",
  auto = "100%"
}

export interface TIconProps extends HTMLAttributes<HTMLOrSVGElement> {
  name: string;
  size?: keyof typeof EnumSizes;
}
