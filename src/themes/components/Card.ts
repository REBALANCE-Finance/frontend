import { cardAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  cardAnatomy.keys
);

const baseStyle = definePartsStyle({
  container: {
    color: "white"
  }
});

const sizes = {
  md: definePartsStyle({
    container: {
      borderRadius: "0"
    }
  }),
  xl: definePartsStyle({
    container: {
      borderRadius: "36px",
      padding: "40px"
    }
  })
};

// define custom variant
const variants = {
  poolCard: definePartsStyle({
    container: {
      w: { base: "100%" },
      minH: "302px",
      padding: "16px",
      gap: "20px",
      bg: "black.80",
      borderRadius: "4px"
    },
    header: {
      padding: "0"
    },
    body: {
      padding: "0"
    },
    footer: { padding: "0" }
  })
};

// export the component theme
export const cardTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants,
  defaultProps: {}
});
