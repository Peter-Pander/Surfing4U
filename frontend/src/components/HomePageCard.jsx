// frontend/src/components/HomePageCard.jsx
import {
  Box,
  Heading,
  Text,
  AspectRatio,
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
          <Heading size="lg" mb={5}>
            {title}
          </Heading>
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
