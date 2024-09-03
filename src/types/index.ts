import { Placement } from "react-joyride";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DefaultDataType = Record<string, any>;

export type AddressType = `0x${string}`;

export type TutorialStep = {
  target: string;
  content: string;
  spotlightClicks?: boolean;
  disableBeacon?: boolean;
  // placement?: "center" | "auto" | Placement;
  placement?: Placement;
  hideFooter?: boolean;
  isFixed?: boolean;
};

export type Task = {
  name: string;
  completed: boolean;
};
