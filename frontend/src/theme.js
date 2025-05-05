// frontend/src/theme.js
import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const config = {
  initialColorMode: "dark",      // start in dark mode by default
  useSystemColorMode: false,     // don’t auto-sync to the OS setting
};

// add global styles so the body uses our color-mode background
const styles = {
  global: (props) => ({
    html: {
      height: "100%",             // ensure full-height root
    },
    body: {
      height: "100%",             // ensure full-height body
      bg: mode("gray.50", "gray.900")(props),  // light vs. dark page background
    },
    "#root": {
      height: "100%",             // ensure React root covers full screen
    },
  }),
};

const theme = extendTheme({ config, styles });

export default theme;
