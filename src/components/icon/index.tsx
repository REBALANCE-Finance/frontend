import React, { FC } from "react";

import { ICON_NAMES } from "../../consts";
import { EnumSizes, Sizes, TIconProps } from "./types";

const Icon: FC<TIconProps> = ({ name, size = "md", width, height, ...props }) => {
  const currentSize = EnumSizes[size as Sizes] ?? size;

  const getImgSrc = (name: string) => {
    const basePath = '/assets/icons/';

    if (name === ICON_NAMES.SILO) {
      return `${basePath}${name}-icon.png`;
    }
    if (name === ICON_NAMES.DOLOMITE) {
      return `${basePath}${name}-icon.jpg`;
    }

    return `${basePath}${name}-icon.svg`;
  };

  const isRoundIcon = [ICON_NAMES.SILO, ICON_NAMES.DOLOMITE].includes(name);

  return (
    <img
      src={getImgSrc(name)}
      alt={name}
      width={width || currentSize}
      height={height || currentSize}
      {...props}
      style={{
        ...(currentSize ? { width: currentSize, height: currentSize } : {}),
        borderRadius: isRoundIcon ? '50%' : undefined,
      }}
    />
  );
};

export default Icon;
