import { defineStyleConfig } from "@chakra-ui/react";

export const Link = defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    link: {
      color: "white",
      fontWeight: "500",
      _hover: {
        textDecoration: "none"
      }
    },
    nav: {
      display: "flex",
      alignItems: "center",
      color: "black.40",
      fontWeight: "500",

      _hover: {
        textDecoration: "none"
      },
      _activeLink: {
        color: "white"
      }
    }
  },
  defaultProps: {
    variant: "nav"
  }
});
