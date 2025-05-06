// frontend/src/components/SurfVideoCard.jsx
import {
  Box,
  Heading,
  Text,
  AspectRatio,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

export default function SurfVideoCard({ video, title }) {
  const bg          = useColorModeValue("white", "gray.700");
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
        {/* Optional custom title */}
        {title && (
          <Heading size="md" mb={2}>
            {title}
          </Heading>
        )}

        {/* Video title */}
        <Heading size="md" mb={2}>
          {video.title || video.name}
        </Heading>

        {/* Optional platform label */}
        {video.platform && (
          <Text fontSize="sm" color="gray.500" mb={2}>
            {video.platform}
          </Text>
        )}

        {/* Optional description */}
        {video.description && (
          <Text fontSize="sm" mb={4}>
            {video.description}
          </Text>
        )}

        {/* Optional IMDb link */}
        {video.imdbUrl && (
          <Link
            href={video.imdbUrl}
            isExternal
            fontSize="sm"
            color="blue.500"
            mb={4}
            display="block"
          >
            View on IMDb
          </Link>
        )}

        {/* Video embed */}
        <AspectRatio ratio={16 / 9} mb={4}>
          <iframe
            title={video.title || video.name}
            src={video.embedUrl || video.url}
            allowFullScreen
          />
        </AspectRatio>
      </Box>
    </Box>
  );
}
