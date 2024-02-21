import React, { FC } from "react";
import { ICON_NAMES } from "../../../consts";
import { TIconProps } from "./types";

export const Icon: FC<TIconProps> = ({ name, ...props }) => {
  if (Object.values(ICON_NAMES).includes(name)) {
    return (
      <svg {...props}>
        <use href={String("#").concat(name).concat("-icon")} />
      </svg>
    );
  }

  return <></>;
};
