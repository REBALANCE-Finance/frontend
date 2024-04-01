import { ToastyTypes } from "../components/toasty/types";
import { handlerToast } from "../components/toasty/utils";

type CopyFn = (text: string) => void;

export const useCopyToClipboard = () => {
  const copy: CopyFn = async text => {
    try {
      await navigator.clipboard.writeText(text);
      handlerToast({ content: "Copy address", type: ToastyTypes.success });
    } catch (error) {
      handlerToast({ content: "Copy failed", type: ToastyTypes.error });
    }
  };

  return copy;
};
