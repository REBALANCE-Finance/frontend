import { switchAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  switchAnatomy.keys
);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  container: {
    // ...
  },
  thumb: {
    bg: "black.100"
  },
  track: {
    bg: "gray.100",
    _checked: {
      bg: "green.100"
    }
  }
});

export const switchTheme = defineMultiStyleConfig({ baseStyle });
