// frontend/src/pages/SpotsPage.jsx
import { Box, Heading, Text } from "@chakra-ui/react";
import SpotGrid from "../components/SpotGrid";

export default function SpotsPage() {
  return (
    <Box p={6}>
      <Heading mb={2}>🌊 Surf Spots</Heading>
      <Text mb={4}>Explore real surf spots, events, and legends around the world.</Text>
      <SpotGrid />
    </Box>
  );
}
