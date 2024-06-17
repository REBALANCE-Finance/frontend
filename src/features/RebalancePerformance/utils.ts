import turboImage from "/public/assets/image/turbo.svg";
import turboLogo from "/public/assets/image/turboLogo.svg";
import chillImage from "/public/assets/image/chill.svg";
import chillLogo from "/public/assets/image/chillLogo.svg";
import chainlinkLogo from "/public/assets/image/ChainlinkLogo.png";
// import nexusLogo from "/public/assets/image/NexusLogo.svg";
import hackenLogo from "/public/assets/image/HackenLogo.svg";
import { ROUTES_TYPE } from "../../consts/routes-type";

export const getCurrentPath = (path: string) => {
  const pathName = path.split("/")[1];

  return pathName;
};

export const performanceInfo = [
  {
    title: "I want to Lend",
    subtitle: "Low-risk investments. Up to 16% APR in stablecoins.",
    image: chillImage.src,
    logo: chillLogo.src,
    type: ROUTES_TYPE.lending,
    logos: [
      {
        src: chainlinkLogo.src,
        w: 65,
        h: 21,
      },
      // {
      //   src: nexusLogo.src,
      //   w: 49,
      //   h: 19,
      // },
      {
        src: hackenLogo.src,
        w: 28,
        h: 28,
      }
    ],
  },
  {
    title: "I want to Borrow (coming soon)",
    subtitle: "The lowest borrowing rates in the market.",
    image: turboImage.src,
    type: ROUTES_TYPE.borrowing,
    logo: turboLogo.src,
    logos: [
      {
        src: hackenLogo.src,
        w: 28,
        h: 28,
      }
    ],
  }
];
