import BorrowImage from "../../assets/image/Borrow.svg";
import LendImage from "../../assets/image/Lend.svg";
import { ROUTES_TYPE } from "../../consts/routes-type";

export const getCurrentPath = (path: string) => {
  const pathName = path.split("/")[1];

  return pathName;
};

export const performanceInfo = [
  {
    title: "I want to Lend",
    subtitle: "Low-risk investments. Up to 16% APR in stablecoins.",
    image: LendImage,
    type: ROUTES_TYPE.lending
  },
  {
    title: "I want to Borrow (coming soon)",
    subtitle: "The lowest borrowing rates in the market.",
    image: BorrowImage,
    type: ROUTES_TYPE.borrowing
  }
];
