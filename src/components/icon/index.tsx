import React, { FC } from "react";
import { ICON_NAMES } from "../../consts";
import { EnumSizes, Sizes, TIconProps } from "./types";

const Icon: FC<TIconProps> = ({ name, size = "md", width, height, ...props }) => {
  const currentSize = EnumSizes[size as Sizes] ?? size;

  const getImgSrc = (name: string) => {
    const basePath = "/assets/icons/";

    const iconValue = Object.hasOwnProperty.call(ICON_NAMES, name)
      ? ICON_NAMES[name as keyof typeof ICON_NAMES]
      : name;

    // Special case for MORPHO numbered icons (MORPHO-1, MORPHO-2, etc.)
    if (iconValue.match(/^MORPHO-[1-5]$/)) {
      const morphoNumber = iconValue.split("-")[1];
      const extension = ["1", "4", "5"].includes(morphoNumber) ? "svg" : "png";
      return `${basePath}${iconValue}-icon.${extension}`;
    }

    if (iconValue === ICON_NAMES.SILO) {
      return `${basePath}${iconValue}-icon.png`;
    }

    if (iconValue === ICON_NAMES.DOLOMITE || iconValue === ICON_NAMES.LODESTAR) {
      return `${basePath}${iconValue}-icon.jpg`;
    }

    if (iconValue === ICON_NAMES.FRAXLEND || iconValue === ICON_NAMES.KINZA) {
      return `${basePath}${iconValue}-icon.png`;
    }

    return `${basePath}${iconValue}-icon.svg`;
  };

  const isRoundIcon = [ICON_NAMES.SILO, ICON_NAMES.DOLOMITE, ICON_NAMES.LODESTAR].includes(name);

  return (
    <img
      src={getImgSrc(name)}
      alt={name}
      width={width || currentSize}
      height={height || currentSize}
      {...props}
      style={{
        ...(currentSize ? { width: currentSize, height: currentSize } : {}),
        borderRadius: isRoundIcon ? "50%" : undefined
      }}
      onError={e => {
        console.error(`Failed to load icon: ${name}, src: ${(e.target as HTMLImageElement).src}`);
      }}
    />
  );
};

export default Icon;
