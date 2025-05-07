import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import SpotCard from "./SpotCard";
import surfspots from "../data/surfspots.json"; // ← point at your JSON

export default function SpotGrid() {
  return (
    <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
      {surfspots.map((spot, idx) => (
        <SpotCard key={idx} spot={spot} />
      ))}
    </SimpleGrid>
  );
}
