// frontend/src/App.jsx
import { ChakraProvider, ColorModeScript, Box, useColorModeValue } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import theme from "./theme";          // ← our custom theme with color-mode config
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SpotsPage from "./pages/SpotsPage";
import SurfTVPage from "./pages/SurfTVPage";
import SurfersPage from "./pages/SurfersPage";
// import EventsPage from "./pages/EventsPage";
// import ForecastsPage from "./pages/ForecastsPage";
// import Surf101Page from "./pages/Surf101Page";
import GlossaryPage from "./pages/GlossaryPage";

function App() {
  // choose light/dark background & text
  const bg = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("gray.800", "gray.100");

  return (
    <>
      {/* make sure Chakra injects the correct <body> class on initial load */}
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraProvider theme={theme}>
        <Box bg={bg} color={color} minH="100vh">
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <Navbar />
            <Routes>
              {/* home */}
              <Route path="/" element={<HomePage />} />

              {/* surf spots list */}
              <Route path="/spots" element={<SpotsPage />} />

              {/* surf tv page */}
              <Route path="/surf-tv" element={<SurfTVPage />} />

              {/* pro surfers directory */}
              <Route path="/surfers" element={<SurfersPage />} />

              {/* surf 101 — glossary */}
              <Route path="/surf-101/glossary" element={<GlossaryPage />} />

              {/* future routes */}
              {/*
                <Route path="/events" element={<EventsPage />} />
                <Route path="/forecasts" element={<ForecastsPage />} />
                <Route path="/surf-101/*" element={<Surf101Page />} />
              */}
            </Routes>
          </BrowserRouter>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default App;
