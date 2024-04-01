import { ChangeEvent } from "react";

export const handlerNumberInput = (
  e: ChangeEvent<HTMLInputElement>,
  callback: (e: ChangeEvent<HTMLInputElement>) => void
) => {
  if (/^(?![.,])\d*(\.|,)?\d*$/.test(e.target.value)) {
    e.target.value = e.target.value.replace(",", ".");
    callback(e);
  }
};
