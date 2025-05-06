// frontend/src/components/SurfVideoGrid.jsx
import { Box, SimpleGrid, Button, HStack } from "@chakra-ui/react";
import surfVideos from "../data/surfVideos";
import SurfVideoCard from "./SurfVideoCard";

export default function SurfVideoGrid({
  filter = { type: null, recommended: null },
  sortBy = null,
  page = 1,
  pageSize = 6,
  onPageChange,
}) {
  const { type, recommended } = filter;

  // 1. Apply filters
  let filtered = surfVideos;
  if (type) {
    filtered = filtered.filter((v) => v.type === type);
  }
  if (recommended !== null) {
    filtered = filtered.filter((v) => v.recommended === recommended);
  }

  // 2. Sort:
  //    - If "recommendedFirst", first by recommended flag (true before false),
  //      then alphabetically by name.
  //    - Otherwise, just alphabetical by name.
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "recommendedFirst") {
      const diff = Number(b.recommended) - Number(a.recommended);
      if (diff !== 0) return diff;
    }
    return a.name.localeCompare(b.name);
  });

  // 3. Pagination calculations
  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (page - 1) * pageSize;
  const pagedVideos = filtered.slice(start, start + pageSize);

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} p={6}>
        {pagedVideos.map((video) => (
          <SurfVideoCard key={video.name} video={video} />
        ))}
      </SimpleGrid>

      {totalPages > 1 && (
        <HStack justify="center" spacing={4} mb={6}>
          <Button
            onClick={() => onPageChange(page - 1)}
            isDisabled={page <= 1}
          >
            Previous
          </Button>
          <Box>
            Page {page} of {totalPages}
          </Box>
          <Button
            onClick={() => onPageChange(page + 1)}
            isDisabled={page >= totalPages}
          >
            Next
          </Button>
        </HStack>
      )}
    </Box>
  );
}
