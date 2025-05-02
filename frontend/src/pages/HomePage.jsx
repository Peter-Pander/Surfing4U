// frontend/src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import SurfVideoCard from "../components/SurfVideoCard";

export default function HomePage() {
  const [video, setVideo] = useState(null);
  const [contestVideo, setContestVideo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/video-of-the-day")
      .then((res) => res.json())
      .then(setVideo)
      .catch(console.error);

    fetch("http://localhost:4000/api/contest-highlight")
      .then((res) => res.json())
      .then(setContestVideo)
      .catch(console.error);
  }, []);

  return (
    <Box px={{ base: 4, md: 10 }} py={10}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {/* Surf Video of the Day */}
        {video ? (
          <SurfVideoCard
            title="🎥 Surf Video of the Day"
            video={video}
          />
        ) : (
          <Text>Loading surf video of the day…</Text>
        )}

        {/* Latest Contest Highlight */}
        {contestVideo ? (
          <SurfVideoCard
            title="🏆 Latest Contest Highlight"
            video={contestVideo}
          />
        ) : (
          <Text>Loading contest highlight…</Text>
        )}
      </SimpleGrid>
    </Box>
  );
}
