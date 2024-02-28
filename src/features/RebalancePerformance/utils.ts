import BorrowImage from "../../assets/image/Borrow.svg";
import LendImage from "../../assets/image/Lend.svg";
import { PERFORMANCE_TYPE } from "../../consts/performance-type";

export const getCurrentPath = (path: string) => {
  const pathName = path.split("/")[1];

  return pathName;
};

export const performanceInfo = [
  {
    title: "I want to Lend",
    subtitle: "Low-risk investments. Up to 16% APR in stablecoins.",
    image: LendImage,
    type: PERFORMANCE_TYPE.lending
  },
  {
    title: "I want to Borrow",
    subtitle: "The lowest borrowing rates in the market.",
    image: BorrowImage,
    type: PERFORMANCE_TYPE.borrowing
  }
];
