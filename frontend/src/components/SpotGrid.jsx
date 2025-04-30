import { SimpleGrid } from "@chakra-ui/react";
import surfSpots from "../data/surfSpots";
import SpotCard from "./SpotCard";

export default function SpotList() {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} p={6}>
      {surfSpots.map((spot) => (
        <SpotCard key={spot.name} spot={spot} />
      ))}
    </SimpleGrid>
  );
}
