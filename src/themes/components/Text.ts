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
    }
  },
  defaultProps: {}
});
