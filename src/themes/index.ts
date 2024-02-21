import { Button } from "./components/Buttons";
import { fontSize } from "./styles/fontSize";
import { colors } from "./styles/colors";
import { extendTheme } from "@chakra-ui/react";
import { global } from "./styles/global";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

export const themes = extendTheme({
  config,
  fonts: {
    heading: "Roboto, sans-serif",
    body: "Roboto, sans-serif",
    mono: "Roboto Mono, sans-serif"
  },
  styles: { global: { ...global } },
  colors: { ...colors },
  fontSize: { ...fontSize },
  components: {
    Button
  }
});
