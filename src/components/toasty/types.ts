import { ReactNode } from "react";
import { ToastOptions } from "react-toastify";

export enum ToastyTypes {
  success = "success",
  error = "error",
  warning = "warning",
  info = "info"
}

export interface IToastProps {
  content: string | ReactNode;
  type: ToastyTypes;
  option?: ToastOptions;
}
