import { inputAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

// default base style from the Input theme
const baseStyle = definePartsStyle({
  field: {
    width: "100%",
    minWidth: 0,
    outline: 0,
    position: "relative",
    appearance: "none",
    transitionProperty: "common",
    transitionDuration: "normal",
    _disabled: {
      opacity: 0.4,
      cursor: "not-allowed"
    }
  }
});

// Defining a custom variant
const variantCustom = definePartsStyle({
  field: {
    border: "0px solid",
    bg: "transparent",
    borderTopRightRadius: "full",
    borderBottomRightRadius: "full",
    _readOnly: {
      boxShadow: "none !important",
      userSelect: "all"
    }
  },
  addon: {
    border: "0px solid",
    borderColor: "transparent",
    borderTopLeftRadius: "full",
    borderBottomLeftRadius: "full",
    bg: "transparent",
    color: "white"
  },
  element: {},
  group: {
    border: "1px solid",
    borderColor: "#1E1E1E",
    borderRadius: "4px",
    alignItems: "center",
    _valid: {
      borderColor: "red"
    }
  }
});

const variants = {
  custom: variantCustom
};

const size = {
  md: defineStyle({
    fontSize: "sm",
    px: "4",
    h: "10",
    borderRadius: "none"
  })
};

const sizes = {
  md: definePartsStyle({
    field: size.md,
    addon: size.md
  })
};

export const inputTheme = defineMultiStyleConfig({
  baseStyle,
  variants,
  sizes,
  defaultProps: {
    variant: "custom"
  }
});
