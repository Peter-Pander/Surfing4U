// frontend/src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import SurfVideoCard from "../components/SurfVideoCard";

function HomePage() {
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/video-of-the-day")
      .then((res) => res.json())
      .then(setVideo)
      .catch(console.error);
  }, []);

  return (
    <Box p={6}>
      {/* Hero / Intro */}
      <Box textAlign="center" mb={10}>
        <Heading size="2xl" mb={2}>
          Surfing4U 🌊
        </Heading>
        <Text fontSize="lg">
          Daily waves & pro highlights – straight to your screen.
        </Text>
      </Box>

      {/* Video of the Day */}
      <Box mb={10}>
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
          >
            <Heading size="md" mb={2}>
              {video.title}
            </Heading>
            <Text fontSize="sm" mb={4}>
              {video.description.substring(0, 140)}...
            </Text>
            <Box
              as="iframe"
              src={video.url}
              width="100%"
              height="315"
              allowFullScreen
              border="0"
              mb={2}
            />
          </Box>
        ) : (
          <Text>Loading video...</Text>
        )}
      </Box>

      {/* Contest Highlights */}
      <Box mb={10}>
        <Heading size="lg" mb={2}>
          🏆 Contest Highlight: Hale’iwa Challenger
        </Heading>
        <Text mb={4}>
          Watch the pros shred one of Hawaii’s most iconic waves.
        </Text>
        {/* Embed a contest highlight video here */}
      </Box>
    </Box>
  );
}

export default HomePage;
