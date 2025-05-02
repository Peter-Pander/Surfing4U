// frontend/src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import SurfVideoCard from "../components/SurfVideoCard";

function HomePage() {
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
    <Box p={6}>
      {/* Videos Grid */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={10}>
        {/* Surf Video of the Day */}
        <Box>
          <Heading size="lg" mb={2}>
            🎥 Surf Video of the Day
          </Heading>
          {video ? (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              bg="gray.800"
              color="white"
              overflow="hidden"
              maxW="680px"
            >
              <Box
                as="iframe"
                src={video.url}
                width="100%"
                height="740px"
                allowFullScreen
                border="0"
                borderRadius="md"
              />
            </Box>
          ) : (
            <Text>Loading video...</Text>
          )}
        </Box>

        {/* Contest Highlight */}
        <Box>
          <Heading size="lg" mb={2}>
            🏆 Contest Highlight
            {contestVideo?.contestName && `: ${contestVideo.contestName}`}
          </Heading>
          {contestVideo ? (
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              bg="gray.800"
              color="white"
              overflow="hidden"
              maxW="680px"
            >
              <Box
                as="iframe"
                src={contestVideo.url}
                width="100%"
                height="740px"
                allowFullScreen
                border="0"
                borderRadius="md"
              />
            </Box>
          ) : (
            <Text>Loading video...</Text>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
}

export default HomePage;
