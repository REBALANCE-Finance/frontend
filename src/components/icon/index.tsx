import React, { FC } from "react";

import { ICON_NAMES } from "../../consts";
import { EnumSizes, Sizes, TIconProps } from "./types";

const Icon: FC<TIconProps> = ({ name, size = "md", width, height, ...props }) => {
  const currentSize = EnumSizes[size as Sizes] ?? size;

  if (Object.values(ICON_NAMES).includes(name)) {
    return (
      <img
        src={`/assets/icons/${name}-icon.svg`}
        alt={name}
        width={currentSize}
        height={currentSize}
        {...props}
      />
    );
  }

  return <></>;
};

export default Icon;
