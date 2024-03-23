import React, { FC } from "react";

import { ICON_NAMES } from "../../consts";
import { EnumSizes, Sizes, TIconProps } from "./types";

const Icon: FC<TIconProps> = ({ name, size = "md", width, height, ...props }) => {
  const currentSize = EnumSizes[size as Sizes] ?? size;

  if (Object.values(ICON_NAMES).includes(name)) {
    // return (
    //   <svg
    //     aria-hidden="true"
    //     width={width ?? currentSize}
    //     height={height ?? currentSize}
    //     {...props}
    //   >
    //     <use href={String("#").concat(name).concat("-icon")} />
    //   </svg>
    // );
    return (
      <img src={`/assets/icons/${name}-icon.svg`} alt={name} width={width} height={height} {...props}/>
    );
  }

  return <></>;
};

export default Icon;
