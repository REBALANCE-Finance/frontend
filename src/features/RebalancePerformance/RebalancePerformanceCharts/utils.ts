import dayjs from "dayjs";

import { ROUTES_TYPE } from "../../../consts/routes-type";
import { themes } from "../../../themes";

export const colorsArea = {
  lending: themes.colors.greenAlpha["100"],
  borrowing: themes.colors.violetAlpha["100"]
};

export const tickFormatter = (e: string) => {
  return dayjs(e).format("MMM DD");
};

export const areaLines = [
  {
    name: "My APY, %",
    type: ROUTES_TYPE.lending
  },
  {
    name: "My earnings, $",
    type: ROUTES_TYPE.borrowing
  }
  // {
  //   name: "Spent on borrowing",
  //   type: ROUTES_TYPE.borrowing
  // }
];
