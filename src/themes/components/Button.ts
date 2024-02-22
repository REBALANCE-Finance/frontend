import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "4px"
  },
  sizes: {
    sm: {
      fontSize: "sm",
      fontWeight: "500"
    },
    md: {
      fontSize: "md",
      fontWeight: "500"
    }
  },
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
      color: "black.100",
      _hover: {
        opacity: "0.8"
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
        opacity: "0.8"
      },
      _disabled: {
        bg: "black.80"
      }
    }
  },
  defaultProps: {}
});
