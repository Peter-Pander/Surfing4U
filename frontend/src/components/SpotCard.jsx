// frontend/src/components/SpotCard.jsx
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import InstagramEmbed from "./InstagramEmbed";

export default function SpotCard({ spot }) {
  const bg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <Box
      bg={bg}
      borderWidth="1px"
      borderColor={borderColor}
      rounded="lg"
      overflow="hidden"
      shadow="sm"
      transition="all 0.2s"
      _hover={{ shadow: "md", transform: "translateY(-2px)" }}
    >
      <Box p={4}>
        <Heading size="md" mb={2}>{spot.name}</Heading>
        <Text fontSize="sm" color="gray.500">{spot.location}</Text>
        <Text fontSize="sm" color="gray.500" mb={2}>{spot.country}</Text>
        <Text fontSize="sm" mb={4}>{spot.description}</Text>
        {spot.embedUrl && (
          <InstagramEmbed url={spot.embedUrl} caption />
        )}
      </Box>
    </Box>
  );
}
