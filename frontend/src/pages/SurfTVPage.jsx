// frontend/src/pages/SurfTVPage.jsx
import { useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import VideoFilterBar from "../components/VideoFilterBar";
import SurfVideoGrid from "../components/SurfVideoGrid";

export default function SurfTVPage() {
  const [type, setType] = useState(null);
  const [page, setPage] = useState(1);

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

      <VideoFilterBar type={type} onTypeChange={handleTypeChange} />

      <SurfVideoGrid
        type={type}
        page={page}
        pageSize={6}
        onPageChange={setPage}
      />
    </Box>
  );
}
