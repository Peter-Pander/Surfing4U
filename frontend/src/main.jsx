// frontend/src/main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import App from "./App.jsx";
import theme from "./theme";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Ensures initial color mode & global styles are injected before your app renders */}
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
