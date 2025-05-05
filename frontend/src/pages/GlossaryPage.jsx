// frontend/src/pages/GlossaryPage.jsx
import {
  Box,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { glossary } from "../data/glossary";

function GlossaryPage() {
  // only tweaking bgColor for light mode; keep your original “top-border only” entries
  const borderColor  = useColorModeValue("gray.200", "gray.600");
  const headingColor = useColorModeValue("gray.800", "white");
  const bgColor      = useColorModeValue("white",   "gray.700");  // ← changed from gray.50 to white
  const textColor    = useColorModeValue("gray.700", "gray.200");

  return (
    <Box maxW="3xl" mx="auto" px={6} py={10} bg={bgColor}>
      <Heading mb={4} color={headingColor}>
        🧠 Surf Glossary
      </Heading>
      <Text mb={6} fontSize="lg" color={textColor}>
        A guide to surf slang, cultural terms, wave types, gear, technique, ocean science, and etiquette.
      </Text>

      {glossary.map((item, idx) => (
        <Box
          key={idx}
          borderTop="1px solid"
          borderColor={borderColor}
          pt={4}
          pb={4}
        >
          <Text fontSize="xl" fontWeight="bold" color={headingColor}>
            {item.term}
          </Text>
          <Text fontSize="md" color={textColor} mt={1}>
            {item.definition}
          </Text>
        </Box>
      ))}
    </Box>
  );
}

export default GlossaryPage;
