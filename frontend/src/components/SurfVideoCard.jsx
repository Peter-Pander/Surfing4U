// frontend/src/components/SurfVideoCard.jsx
import {
  Box,
  Heading,
  Text,
  Button,
  AspectRatio,
  useColorModeValue,
} from "@chakra-ui/react";

export default function SurfVideoCard({ video }) {
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
        <Heading size="md" mb={2}>
          {video.name}
        </Heading>

        {video.platform && (
          <Text fontSize="sm" color="gray.500" mb={2}>
            {video.platform}
          </Text>
        )}

        <Text fontSize="sm" mb={4}>
          {video.description}
        </Text>

        {video.embedUrl ? (
          <AspectRatio ratio={16 / 9} mb={4}>
            <iframe
              title={video.name}
              src={video.embedUrl}
              allowFullScreen
            />
          </AspectRatio>
        ) : (
          video.url && (
            <Button
              as="a"
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch on {video.platform}
            </Button>
          )
        )}
      </Box>
    </Box>
  );
}
