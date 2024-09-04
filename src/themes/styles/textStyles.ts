import { Roboto_Mono } from "next/font/google";

const roboto_mono = Roboto_Mono({
  subsets: ["cyrillic"]
});

export const textStyles = {
  h1: {
    fontSize: { base: "22px", md: "30px" },
    fontWeight: "500"
  },
  h2: {
    fontSize: { base: "16px", md: "20px" },
    fontWeight: "400"
  },
  text16: {
    fontSize: "16px",
    fontWeight: "400"
  },
  text14: {
    fontSize: "14px",
    fontWeight: "400"
  },
  text12: {
    fontSize: "12px",
    fontWeight: "400"
  },
  text10: {
    fontSize: "10px",
    fontWeight: "400"
  },
  textMono20: {
    fontFamily: roboto_mono.style.fontFamily,
    fontSize: "20px",
    fontWeight: "500"
  },
  textMono16: {
    fontFamily: roboto_mono.style.fontFamily,
    fontSize: "16px",
    fontWeight: "500"
  },
  textMono14: {
    fontFamily: roboto_mono.style.fontFamily,
    fontSize: "14px",
    fontWeight: "500"
  },
  textMono12: {
    fontFamily: roboto_mono.style.fontFamily,
    fontSize: "12px",
    fontWeight: "500"
  },
  textMono10: {
    fontFamily: roboto_mono.style.fontFamily,
    fontSize: "10px",
    fontWeight: "500"
  }
};
