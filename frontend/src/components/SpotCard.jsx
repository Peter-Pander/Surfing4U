import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function SpotCard({ spot }) {
  const { name, country, lat, lng } = spot;
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4}>
      <Heading size="md" mb={2}>{name}</Heading>
      <Text fontSize="sm" mb={1}>🌍 {country}</Text>
      <Text fontSize="xs">📍 {lat}, {lng}</Text>
    </Box>
  );
}
