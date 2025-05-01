// frontend/src/pages/SurfTVPage.jsx
import { Box, Heading, Text } from "@chakra-ui/react";
import SurfVideoGrid from "../components/SurfVideoGrid";

export default function SurfTVPage() {
  return (
    <Box p={6}>
      <Heading mb={2}>📺 Surf TV</Heading>
      <Text mb={4}>
        Dive into a curated collection of surf documentaries, films, and shows.
      </Text>
      <SurfVideoGrid />   {/* now defined */}
    </Box>
  );
}
