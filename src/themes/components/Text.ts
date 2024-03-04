import { defineStyleConfig } from "@chakra-ui/react";

export const Text = defineStyleConfig({
  baseStyle: {},
  sizes: {},
  variants: {
    tooltip: {
      cursor: "help",
      textDecoration: "underline",
      textDecorationStyle: "dashed",
      color: "darkGray"
    },
    t22: {
      fontSize: "xl",
      fontWeight: 500
    },
    t20: {
      fontSize: "lg",
      fontWeight: 500
    }
  },
  defaultProps: {}
});
