import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Spinner, Center } from '@chakra-ui/react';
import SurferProCard from '../components/SurferProCard';

export default function SurfersPage() {
  const [surfers, setSurfers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/surfers')
      .then((res) => res.json())
      .then((data) => {
        setSurfers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center h="60vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!surfers.length) {
    return <Heading>No surfers found.</Heading>;
  }

  // pick one random featured
  const featuredIndex = Math.floor(Math.random() * surfers.length);
  const featured = surfers[featuredIndex];
  const others = surfers.filter((_, i) => i !== featuredIndex);

  return (
    <Box px={[4, 8]} py={6}>
      <Heading mb={6}>🏄 Featured Surfer</Heading>
      <SurferProCard surfer={featured} />

      <Heading mb={4}>All Pros</Heading>
      <SimpleGrid columns={[1, 2]} spacing={6}>
        {others.map((s) => (
          <SurferProCard key={s._id} surfer={s} />
        ))}
      </SimpleGrid>
    </Box>
  );
}
