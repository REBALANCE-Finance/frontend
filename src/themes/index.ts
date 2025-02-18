import { extendTheme } from "@chakra-ui/react";

import { Button } from "./components/Button";
import { cardTheme } from "./components/Card";
import { drawerTheme } from "./components/Drawer";
import { inputTheme } from "./components/Input";
import { Link } from "./components/Link";
import { switchTheme } from "./components/Switch";
import { Text } from "./components/Text";
import { colors } from "./styles/colors";
import { fontSizes } from "./styles/fontSize";
import { global } from "./styles/global";
import { textStyles } from "./styles/textStyles";
import { Roboto, Roboto_Mono, DM_Sans } from "next/font/google";

const roboto = Roboto({
  subsets: ["cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"]
});

const roboto_mono = Roboto_Mono({
  subsets: ["cyrillic"]
});

const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"] });

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false
};

export const themes = extendTheme({
  config,
  fonts: {
    heading: roboto.style.fontFamily,
    body: roboto.style.fontFamily,
    mono: roboto_mono.style.fontFamily,
    dmSans: dmSans.style.fontFamily
  },
  styles: { global: { ...global } },
  colors: { ...colors },
  textStyles: {
    ...textStyles
  },
  fontSizes: { ...fontSizes },
  components: {
    Text,
    Button,
    Link,
    Card: cardTheme,
    Switch: switchTheme,
    Drawer: drawerTheme,
    Input: inputTheme
  },
  breakpoints: {
    sm: "400px",
    md: "700px",
    lg: "960px",
    xl: "1300px",
    xxl: "1400px"
  }
});
