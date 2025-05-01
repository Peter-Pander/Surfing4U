// frontend/src/components/SurfVideoGrid.jsx
import { SimpleGrid } from "@chakra-ui/react";
import surfVideos from "../data/surfVideos";
import SurfVideoCard from "./SurfVideoCard";

export default function SurfVideoGrid() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} p={6}>
      {surfVideos.map((video) => (
        <SurfVideoCard key={video.name} video={video} />
      ))}
    </SimpleGrid>
  );
}
