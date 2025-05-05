// frontend/src/theme.js
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",      // start in dark mode by default
  useSystemColorMode: false,     // don’t auto-sync to the OS setting
};

const theme = extendTheme({ config });

export default theme;
