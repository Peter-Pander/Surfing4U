// frontend/src/pages/SpotsPage.jsx
import { useState, useMemo } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Input,
  SimpleGrid,
  AspectRatio,
} from "@chakra-ui/react";
import surfspots from "../data/surfspots.json";
import SpotCard from "../components/SpotCard";

export default function SpotsPage() {
  // filter options with label and optional start/end
  const filterOptions = [
    { label: "ALL" },
    { label: "#" },
    { label: "A–D", start: "A", end: "D" },
    { label: "E–H", start: "E", end: "H" },
    { label: "I–L", start: "I", end: "L" },
    { label: "M–P", start: "M", end: "P" },
    { label: "Q–T", start: "Q", end: "T" },
    { label: "U–Z", start: "U", end: "Z" },
  ];

  const [filterRange, setFilterRange] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // compute filtered spots based on first-character range
  const filteredSpots = useMemo(() => {
    return surfspots.filter((s) => {
      if (filterRange === "ALL") return true;

      // numeric/symbol bucket
      if (filterRange === "#") {
        const first = s.name[0]?.toUpperCase() || "";
        // anything outside A–Z
        return first < "A" || first > "Z";
      }

      // letter buckets
      const opt = filterOptions.find((o) => o.label === filterRange);
      const first = s.name[0]?.toUpperCase() || "";
      return first >= opt.start && first <= opt.end;
    });
  }, [filterRange]);

  const total = filteredSpots.length;

  // start at a random index within filtered list
  const [index, setIndex] = useState(
    () => Math.floor(Math.random() * total)
  );

  // wraparound navigation
  const prev = () => setIndex((i) => (i - 1 + total) % total);
  const next = () => setIndex((i) => (i + 1) % total);

  // handle clicking a filter button
  const onFilterClick = (label) => {
    setFilterRange(label);
    setIndex(0);
  };

  // on search, jump to first matching spot within filtered list
  const onSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const lower = term.toLowerCase();

    // exact match first
    const exact = filteredSpots.findIndex(
      (s) => s.name.toLowerCase() === lower
    );
    if (exact >= 0) {
      setIndex(exact);
      return;
    }

    // prefix match next
    const prefix = filteredSpots.findIndex((s) =>
      s.name.toLowerCase().startsWith(lower)
    );
    if (prefix >= 0) {
      setIndex(prefix);
      return;
    }

    // partial match last
    const partial = filteredSpots.findIndex((s) =>
      s.name.toLowerCase().includes(lower)
    );
    if (partial >= 0) {
      setIndex(partial);
    }
  };

  const spot = filteredSpots[index];

  return (
    <Box p={6}>
      <Heading mb={4}>🌊 Surf Spots</Heading>

      {/* filter buttons */}
      <Flex mb={4} wrap="wrap">
        {filterOptions.map((opt) => (
          <Button
            key={opt.label}
            size="sm"
            mr={2}
            mb={2}
            variant={filterRange === opt.label ? "solid" : "outline"}
            onClick={() => onFilterClick(opt.label)}
          >
            {opt.label}
          </Button>
        ))}
      </Flex>

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
          {total > 0 ? `${index + 1} / ${total}` : "0 / 0"}
        </Text>

        <Button onClick={next} variant="outline">
          Next →
        </Button>
      </Flex>

      {/* the single card + videos */}
      {total > 0 ? (
        <>
          <SpotCard spot={spot} />

          {/* videos section */}
          {spot.videos && spot.videos.length > 0 && (
            <Box mt={6}>
              <Heading size="md" mb={3}>
                🎥 Surf Videos
              </Heading>
              <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={4}>
                {spot.videos.map((id) => (
                  <AspectRatio key={id} ratio={16 / 9}>
                    <iframe
                      title={`surf-video-${id}`}
                      src={`https://www.youtube.com/embed/${id}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </AspectRatio>
                ))}
              </SimpleGrid>
            </Box>
          )}
        </>
      ) : (
        <Text>No spots found</Text>
      )}

      {/* bottom nav controls */}
      <Flex mt={4} align="center" justify="space-between">
        <Button onClick={prev} variant="outline">
          ← Previous
        </Button>

        <Text>
          {total > 0 ? `${index + 1} / ${total}` : "0 / 0"}
        </Text>

        <Button onClick={next} variant="outline">
          Next →
        </Button>
      </Flex>
    </Box>
  );
}
