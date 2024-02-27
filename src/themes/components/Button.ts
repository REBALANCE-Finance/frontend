import { defineStyleConfig } from "@chakra-ui/react";

export const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: "4px",
    color: "black.0"
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
      color: "lightGray",
      _hover: {
        bg: "lightGray",
        color: "black",
        _disabled: {
          color: "lightGray",
          bg: "black.80"
        }
      },
      _disabled: {
        bg: "black.80"
      }
    },
    primaryWhite: {
      border: "none",
      bg: "lightGray",
      color: "black.100",
      // _hover: {
      //   opacity: "0.8"
      // },
      _disabled: {
        bg: "black.80"
      }
    },
    outline: {
      color: "black.0",
      border: "1px solid",
      borderColor: "black.40",
      bg: "none",
      _hover: {
        opacity: "0.8"
      },
      _disabled: {
        bg: "black.80"
      }
    },
    secondaryOutline: {
      padding: "4px 12px",
      border: "1px solid",
      borderColor: "black.40",
      color: "black.0"
    },
    without: {
      p: "0",
      w: "fit-content",
      bg: "transparent"
    }
  },
  defaultProps: {
    variant: "without"
  }
});
