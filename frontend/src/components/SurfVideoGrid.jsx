// frontend/src/components/SurfVideoGrid.jsx
import { SimpleGrid } from "@chakra-ui/react";
import surfVideos from "../data/surfVideos";
import SurfVideoCard from "./SurfVideoCard";

export default function SurfVideoGrid({
  filter = { type: null, recommended: null },
  sortBy = null,
}) {
  const { type = null, recommended = null } = filter;

  // 1. Filter by type if provided
  let filteredVideos = surfVideos;
  if (type) {
    filteredVideos = filteredVideos.filter((v) => v.type === type);
  }

  // 2. Filter by recommended flag if it’s not null
  if (recommended !== null) {
    filteredVideos = filteredVideos.filter(
      (v) => v.recommended === recommended
    );
  }

  // 3. Optionally sort: recommended first
  if (sortBy === "recommendedFirst") {
    filteredVideos = [...filteredVideos].sort(
      (a, b) => Number(b.recommended) - Number(a.recommended)
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} p={6}>
      {filteredVideos.map((video) => (
        <SurfVideoCard key={video.name} video={video} />
      ))}
    </SimpleGrid>
  );
}
