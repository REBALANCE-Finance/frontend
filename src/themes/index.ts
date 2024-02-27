import { extendTheme } from "@chakra-ui/react";

import { Button } from "./components/Button";
import { cardTheme } from "./components/Card";
import { drawerTheme } from "./components/Drawer";
import { Link } from "./components/Link";
import { switchTheme } from "./components/Switch";
import { colors } from "./styles/colors";
import { fontSizes } from "./styles/fontSize";
import { global } from "./styles/global";
import { textStyles } from "./styles/textStyles";

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
  textStyles: {
    ...textStyles
  },
  fontSizes: { ...fontSizes },
  components: {
    Button,
    Link,
    Card: cardTheme,
    Switch: switchTheme,
    Drawer: drawerTheme
  },
  breakpoints: {
    sm: "400px",
    md: "700px",
    lg: "960px",
    xl: "1300px",
    xxl: "1400px"
  }
});
