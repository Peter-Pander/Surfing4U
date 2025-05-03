// frontend/src/pages/GlossaryPage.jsx
import {
  Box,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import { glossary } from "../data/glossary";

function GlossaryPage() {
  const borderColor  = useColorModeValue("gray.200", "gray.600");
  const headingColor = useColorModeValue("gray.800", "white");
  const panelBg      = useColorModeValue("gray.50", "gray.700");
  const textColor    = useColorModeValue("gray.700", "gray.200");

  return (
    <Box maxW="3xl" mx="auto" px={6} py={10}>
      <Heading mb={4} color={headingColor}>
        🧠 Surf Glossary
      </Heading>
      <Text mb={6} fontSize="lg" color={textColor}>
        A guide to surf slang, Hawaiian cultural terms, and wave types.
      </Text>

      <Accordion allowToggle>
        {glossary.map((item, idx) => (
          <AccordionItem key={idx} borderTop="1px solid" borderColor={borderColor}>
            <h2>
              <AccordionButton _expanded={{ bg: panelBg, color: textColor }}>
                <Box flex="1" textAlign="left" fontWeight="bold" color={textColor}>
                  {item.term}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel bg={panelBg} pb={4} color={textColor}>
              {item.definition}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

export default GlossaryPage;
