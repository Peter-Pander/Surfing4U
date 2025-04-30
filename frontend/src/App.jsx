// frontend/src/App.jsx
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SpotsPage from "./pages/SpotsPage";

function App() {
  return (
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          {/* home */}
          <Route path="/" element={<HomePage />} />

          {/* surf spots list */}
          <Route path="/spots" element={<SpotsPage />} />

          {/* future routes */}
          {/*
            <Route path="/events" element={<EventsPage />} />
            <Route path="/surfers" element={<SurfersPage />} />
            <Route path="/glossary" element={<GlossaryPage />} />
          */}
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
