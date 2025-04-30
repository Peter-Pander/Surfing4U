// frontend/src/pages/HomePage.jsx
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
} from "@chakra-ui/react";

function HomePage() {
  return (
    <Box p={6}>
      {/* Hero Section */}
      <Box textAlign="center" mb={10}>
        <Heading size="2xl" mb={2}>
          Surfing4U 🌊
        </Heading>
        <Text fontSize="lg" mb={4}>
          Your beginner-friendly guide to surf spots, surfers, and surf culture.
        </Text>
        <Button colorScheme="teal" size="lg">
          Explore Surf Spots
        </Button>
      </Box>

      {/* substitute Divider with a styled Box */}
      <Box borderBottomWidth="1px" borderColor="gray.200" mb={10} />

      {/* Featured Surf Spot */}
      <Box mb={10}>
        <Heading size="lg" mb={2}>
          🌟 Featured Surf Spot: Banzai Pipeline
        </Heading>
        <Text mb={4}>
          World-famous reef break on Oahu’s North Shore.
        </Text>
        {/* InstagramEmbed goes here later */}
      </Box>

      {/* Placeholder Sections */}
      <Stack spacing={8}>
        <Box>
          <Heading size="md">🏄 Surfer Spotlight</Heading>
          <Text color="gray.600">Meet the legends and rising stars.</Text>
        </Box>

        <Box>
          <Heading size="md">📺 Contest Highlights</Heading>
          <Text color="gray.600">Watch how the pros shred.</Text>
        </Box>

        <Box>
          <Heading size="md">🧠 Learn the Lingo</Heading>
          <Text color="gray.600">No more kook moments. Understand surf speak.</Text>
        </Box>

        <Box>
          <Heading size="md">🎬 Chill & Watch</Heading>
          <Text color="gray.600">Top surf movies, shows, and docs to binge.</Text>
        </Box>
      </Stack>
    </Box>
  );
}

export default HomePage;
