// frontend/src/pages/HomePage.jsx
import {
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

function HomePage() {
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
        <Text mb={4}>
          A handpicked clip from today’s best surf content.
        </Text>
        {/* You can embed a video manually or add InstagramEmbed/YouTubeEmbed here */}
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
