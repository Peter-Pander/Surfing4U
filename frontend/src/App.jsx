// frontend/src/App.jsx
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SpotsPage from "./pages/SpotsPage";

function App() {
  return (
    <ChakraProvider>
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

          {/* future routes */}
          {/*
            <Route path="/surfers" element={<SurfersPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/forecasts" element={<ForecastsPage />} />
            <Route path="/surf-tv/*" element={<SurfTvPage />} />
            <Route path="/surf-101/*" element={<Surf101Page />} />
          */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
