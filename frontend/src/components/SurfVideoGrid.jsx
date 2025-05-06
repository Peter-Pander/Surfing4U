// frontend/src/components/SurfVideoGrid.jsx
import { Box, SimpleGrid, Button, HStack } from "@chakra-ui/react";
import surfVideos from "../data/surfVideos";
import SurfVideoCard from "./SurfVideoCard";

export default function SurfVideoGrid({
  type = null,
  page = 1,
  pageSize = 6,
  onPageChange,
}) {
  // 1. Filter based on the dropdown
  let filtered = surfVideos;
  if (type === "Recommended") {
    filtered = filtered.filter((v) => v.recommended);
  } else if (type) {
    filtered = filtered.filter((v) => v.type === type);
  }

  // 2. Always sort A→Z by name
  filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  // 3. Paginate
  const totalPages = Math.ceil(filtered.length / pageSize);
  const start = (page - 1) * pageSize;
  const pageItems = filtered.slice(start, start + pageSize);

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} p={6}>
        {pageItems.map((video) => (
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
