// frontend/src/pages/SurfTVPage.jsx
import { useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import SearchBar from "../components/SearchBar";
import VideoFilterBar from "../components/VideoFilterBar";
import SurfVideoGrid from "../components/SurfVideoGrid";

export default function SurfTVPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [type, setType] = useState(null);
  const [page, setPage] = useState(1);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // reset pagination on new search
  };

  const handleTypeChange = (newType) => {
    setType(newType);
    setPage(1); // reset pagination when filter changes
  };

  return (
    <Box p={6}>
      <Heading mb={2}>📺 Surf TV</Heading>
      <Text mb={4}>
        Dive into a curated collection of surf documentaries, films, and shows.
      </Text>

      {/* Dedicated SearchBar component */}
      <SearchBar
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search Surf TV..."
      />

      {/* Filter dropdown */}
      <VideoFilterBar type={type} onTypeChange={handleTypeChange} />

      {/* Video grid with search, filter & pagination */}
      <SurfVideoGrid
        searchQuery={searchQuery}
        type={type}
        page={page}
        pageSize={6}
        onPageChange={setPage}
      />
    </Box>
  );
}
