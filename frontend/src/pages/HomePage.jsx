// frontend/src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import HomePageCard from "../components/HomePageCard";

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

  // dynamic light / dark values
  const pageBg    = useColorModeValue("gray.50",  "gray.900");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box
      px={{ base: 4, md: 10 }}
      py={10}
      bg={pageBg}
      color={textColor}
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
        {/* Surf Video of the Day */}
        {video ? (
          <HomePageCard
            title="🎥 Surf Video of the Day"
            video={video}
          />
        ) : (
          <Text>Loading surf video of the day…</Text>
        )}

        {/* Latest Contest Highlight */}
        {contestVideo ? (
          <HomePageCard
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
