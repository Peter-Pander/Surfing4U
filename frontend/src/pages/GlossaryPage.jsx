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
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";

const glossary = [
  {
    term: "Stoked",
    definition: "Extremely excited or happy — a core emotion in surf culture.",
  },
  {
    term: "Aloha",
    definition:
      "A Hawaiian word used for love, peace, and hello/goodbye. It represents the surf spirit.",
  },
  {
    term: "Barrel",
    definition:
      "The hollow part of a wave that forms when it breaks — surfers aim to ride inside the barrel.",
  },
  {
    term: "Gnarly",
    definition:
      "Slang for something intense, dangerous, or cool (e.g. a gnarly wave or gnarly wipeout).",
  },
  {
    term: "Point Break",
    definition:
      "A type of surf break where waves peel along a headland or point of land.",
  },
  {
    term: "Hang Ten",
    definition:
      "A longboard trick where the surfer walks to the nose of the board and hangs all 10 toes off the edge.",
  },
  {
    term: "Kook",
    definition:
      "A beginner or inexperienced surfer who doesn't follow surf etiquette — sometimes used jokingly.",
  },
  {
    term: "Reef Break",
    definition:
      "A wave that breaks over a coral reef or rock shelf — often powerful and dangerous.",
  },
];

function GlossaryPage() {
  // light / dark values
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const headingColor = useColorModeValue("gray.800", "white");
  const panelBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.200");

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
