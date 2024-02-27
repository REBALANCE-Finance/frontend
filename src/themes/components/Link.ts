import { defineStyleConfig } from "@chakra-ui/react";

export const Link = defineStyleConfig({
  baseStyle: {
    textDecoration: "none",
    _hover: {
      textDecoration: "none"
    }
  },
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
      color: "black.5",
      fontWeight: "500",

      _hover: {
        textDecoration: "none"
      },
      _activeLink: {
        color: "white"
      }
    }
  },
  defaultProps: {}
});
