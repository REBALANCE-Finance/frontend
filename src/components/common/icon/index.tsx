import React, { FC } from "react";

import { ICON_NAMES } from "../../../consts";
import { EnumSizes, TIconProps } from "./types";

export const Icon: FC<TIconProps> = ({ name, size = "md", ...props }) => {
  const currentSize = EnumSizes[size];

  if (Object.values(ICON_NAMES).includes(name)) {
    return (
      <svg aria-hidden="true" width={currentSize} height={currentSize} {...props}>
        <use href={String("#").concat(name).concat("-icon")} />
      </svg>
    );
  }

  return <></>;
};
