import { useState } from "react";

import { TDate } from "./types";

export const useDateSwitcher = (date: TDate) => {
  const [selectedDate, setSelectDate] = useState(date);

  return { selectedDate, setSelectDate };
};
