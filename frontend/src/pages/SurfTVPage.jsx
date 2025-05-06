// frontend/src/pages/SurfTVPage.jsx
import { useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import VideoFilterBar from "../components/VideoFilterBar";
import SurfVideoGrid from "../components/SurfVideoGrid";

export default function SurfTVPage() {
  const [filter, setFilter] = useState({ type: null, recommended: null });
  const [sortBy, setSortBy] = useState(null);
  const [page, setPage] = useState(1);

  // Reset to page 1 on any filter/sort change
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
  };
  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setPage(1);
  };

  return (
    <Box p={6}>
      <Heading mb={2}>📺 Surf TV</Heading>
      <Text mb={4}>
        Dive into a curated collection of surf documentaries, films, and shows.
      </Text>

      <VideoFilterBar
        filter={filter}
        sortBy={sortBy}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
      />

      <SurfVideoGrid
        filter={filter}
        sortBy={sortBy}
        page={page}
        pageSize={6}
        onPageChange={setPage}
      />
    </Box>
  );
}
