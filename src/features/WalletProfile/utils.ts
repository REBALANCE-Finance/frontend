import { themes } from "../../themes";

export const colorTransactionStatus = {
  completed: {
    bg: themes.colors.greenAlpha["10"],
    color: themes.colors.greenAlpha["80"]
  },
  proccess: {
    bg: themes.colors.blueAlpha["10"],
    color: themes.colors.blueAlpha["60"]
  },
  rejected: {
    bg: themes.colors.orangeAlpha["10"],
    color: themes.colors.orangeAlpha["60"]
  }
};
