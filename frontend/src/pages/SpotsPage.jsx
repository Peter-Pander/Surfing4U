// frontend/src/pages/SpotsPage.jsx
import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Input,
} from "@chakra-ui/react";
import surfspots from "../data/surfspots.json";
import SpotCard from "../components/SpotCard";

export default function SpotsPage() {
  const total = surfspots.length;

  // start at a random index
  const [index, setIndex] = useState(
    () => Math.floor(Math.random() * total)
  );
  const [searchTerm, setSearchTerm] = useState("");

  // wraparound navigation
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // on search, jump to first matching spot
  const onSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const lower = term.toLowerCase();

    // try exact match first
    const exact = surfspots.findIndex(
      (s) => s.name.toLowerCase() === lower
    );
    if (exact >= 0) {
      setIndex(exact);
      return;
    }

    // then prefix match
    const prefix = surfspots.findIndex(
      (s) => s.name.toLowerCase().startsWith(lower)
    );
    if (prefix >= 0) {
      setIndex(prefix);
      return;
    }

    // then partial match
    const partial = surfspots.findIndex((s) =>
      s.name.toLowerCase().includes(lower)
    );
    if (partial >= 0) {
      setIndex(partial);
    }
  };

  const spot = surfspots[index];

  return (
    <Box p={6}>
      <Heading mb={2}>🌊 Surf Spots</Heading>
      <Text mb={4}>
        Showing one spot at a time—perfect for heavy embeds and quick lookup.
      </Text>

      {/* simple search */}
      <Input
        placeholder="Search spot by name…"
        mb={4}
        value={searchTerm}
        onChange={onSearchChange}
      />

      {/* top nav controls */}
      <Flex mb={4} align="center" justify="space-between">
        <Button onClick={prev} variant="outline">
          ← Previous
        </Button>

        <Text>
          {index + 1} / {total}
        </Text>

        <Button onClick={next} variant="outline">
          Next →
        </Button>
      </Flex>

      {/* the single card */}
      <SpotCard spot={spot} />

      {/* bottom nav controls */}
      <Flex mt={4} align="center" justify="space-between">
        <Button onClick={prev} variant="outline">
          ← Previous
        </Button>

        <Text>
          {index + 1} / {total}
        </Text>

        <Button onClick={next} variant="outline">
          Next →
        </Button>
      </Flex>
    </Box>
  );
}
