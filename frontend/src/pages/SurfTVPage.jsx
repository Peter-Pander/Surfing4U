// frontend/src/pages/SurfTVPage.jsx
import { useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import VideoFilterBar from "../components/VideoFilterBar";
import SurfVideoGrid from "../components/SurfVideoGrid";

export default function SurfTVPage() {
  // filter.type: "Movie" | "TV Show" | "Documentary" | null
  // filter.recommended: true | false | null
  const [filter, setFilter] = useState({ type: null, recommended: null });
  // sortBy: "recommendedFirst" | null
  const [sortBy, setSortBy] = useState(null);

  return (
    <Box p={6}>
      <Heading mb={2}>📺 Surf TV</Heading>
      <Text mb={4}>
        Dive into a curated collection of surf documentaries, films, and shows.
      </Text>

      {/* FilterBar lets the user pick type and toggle "recommended only" */}
      <VideoFilterBar
        filter={filter}
        sortBy={sortBy}
        onFilterChange={setFilter}
        onSortChange={setSortBy}
      />

      {/* Grid will apply those filters/sort when rendering */}
      <SurfVideoGrid filter={filter} sortBy={sortBy} />
    </Box>
  );
}
