import BorrowImage from "/public/assets/image/Borrow.svg";
import LendImage from "/public/assets/image/Lend.svg";
import { ROUTES_TYPE } from "../../consts/routes-type";

export const getCurrentPath = (path: string) => {
  const pathName = path.split("/")[1];

  return pathName;
};

export const performanceInfo = [
  {
    title: "I want to Lend",
    subtitle: "Low-risk investments. Up to 16% APR in stablecoins.",
    image: LendImage.src,
    type: ROUTES_TYPE.lending
  },
  {
    title: "I want to Borrow (coming soon)",
    subtitle: "The lowest borrowing rates in the market.",
    image: BorrowImage.src,
    type: ROUTES_TYPE.borrowing
  }
];
