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
} from "@chakra-ui/react";

const glossary = [
  {
    term: "Stoked",
    definition: "Extremely excited or happy — a core emotion in surf culture.",
  },
  {
    term: "Aloha",
    definition: "A Hawaiian word used for love, peace, and hello/goodbye. It represents the surf spirit.",
  },
  {
    term: "Barrel",
    definition: "The hollow part of a wave that forms when it breaks — surfers aim to ride inside the barrel.",
  },
  {
    term: "Gnarly",
    definition: "Slang for something intense, dangerous, or cool (e.g. a gnarly wave or gnarly wipeout).",
  },
  {
    term: "Point Break",
    definition: "A type of surf break where waves peel along a headland or point of land.",
  },
  {
    term: "Hang Ten",
    definition: "A longboard trick where the surfer walks to the nose of the board and hangs all 10 toes off the edge.",
  },
  {
    term: "Kook",
    definition: "A beginner or inexperienced surfer who doesn't follow surf etiquette — sometimes used jokingly.",
  },
  {
    term: "Reef Break",
    definition: "A wave that breaks over a coral reef or rock shelf — often powerful and dangerous.",
  },
];

function GlossaryPage() {
  return (
    <Box maxW="3xl" mx="auto" px={6} py={10}>
      <Heading mb={4}>🧠 Surf Glossary</Heading>
      <Text mb={6} fontSize="lg">
        A guide to surf slang, Hawaiian cultural terms, and wave types — whether you're new to the sport or brushing up before your next sesh.
      </Text>
      <Divider mb={6} />

      <Accordion allowToggle>
        {glossary.map((item, index) => (
          <AccordionItem key={index} borderTop="1px solid #eee">
            <h2>
              <AccordionButton _expanded={{ bg: "gray.100" }}>
                <Box flex="1" textAlign="left" fontWeight="bold">
                  {item.term}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>{item.definition}</AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}

export default GlossaryPage;
