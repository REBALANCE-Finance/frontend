import { Text } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { DEFAULT_TOAST_TIME, ICON_NAMES } from "../../consts";
import { Icon } from "../icon";
import { ToastWrapper } from ".";
import { IToastProps, ToastyTypes } from "./types";

const icons = {
  success: ICON_NAMES.success,
  error: ICON_NAMES.worning,
  warning: ICON_NAMES.attention,
  info: ICON_NAMES.info
};

export const handlerToast = ({ content, type, option }: IToastProps) => {
  const isContentString = typeof content === "string";
  const autoClose = option?.autoClose ?? DEFAULT_TOAST_TIME;
  const icon = <Icon name={icons[type]} width="115px" height="100%" />;
  const finalyContent = isContentString ? <Text>{content}</Text> : content;
  const toastId = isContentString ? `${content}-${type}` : type;

  const defaultOption = {
    ...option,
    toastId: toastId,
    autoClose
  };

  switch (type) {
    case ToastyTypes.success:
      toast.success(<ToastWrapper type={type}>{finalyContent}</ToastWrapper>, {
        icon,
        ...defaultOption
      });
      break;
    case ToastyTypes.error:
      toast.error(<ToastWrapper type={type}>{finalyContent}</ToastWrapper>, {
        icon,
        ...defaultOption
      });
      break;
    case ToastyTypes.warning:
      toast.warning(<ToastWrapper type={type}>{finalyContent}</ToastWrapper>, {
        icon,
        ...defaultOption
      });
      break;
    case ToastyTypes.info:
      toast.info(<ToastWrapper type={type}>{finalyContent}</ToastWrapper>, {
        icon,
        ...defaultOption
      });
      break;
    default:
      break;
  }
};
