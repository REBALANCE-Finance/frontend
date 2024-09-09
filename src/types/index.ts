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
  complete: boolean;
  type: "twitter" | "telegram" | "wallet" | "deposit" | "freeze";
};

//{"address":"0xd02df454eebf85278b3c257ebc880709dc5e96ce","reward":null,"claimable":null,"proof":null}

export type Reward = {
  address: string;
  reward: string | null;
  claimable: string | null;
  proof: string | null;
};
