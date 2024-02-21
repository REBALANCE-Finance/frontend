import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "4px"
  },
  sizes: {},
  variants: {
    primaryFilled: {
      bg: "black.40",
      color: "gray",
      _hover: {
        bg: "gray",
        color: "black",
        _disabled: {
          color: "gray",
          bg: "black.80"
        }
      },
      _disabled: {
        bg: "black.80"
      }
    },
    primaryWhite: {
      border: "none",
      bg: "gray",
      _hover: {
        bg: "rgba(255, 255, 255, 0.2)"
      },
      _disabled: {
        bg: "black.80"
      }
    },
    outline: {
      border: "1px solid",
      borderColor: "black.40",
      bg: "none",
      _hover: {
        bgGradient:
          "linear(to-t, rgba(0, 135, 54, 1), rgba(26, 157, 78, 1), rgba(91, 225, 145, 1))",
        _disabled: {
          bgGradient:
            "linear(to-t, rgba(0, 135, 54, 1), rgba(26, 157, 78, 1), rgba(91, 225, 145, 1))"
        }
      },
      _disabled: {
        bg: "black.80"
      }
    }
  },
  defaultProps: {}
});
