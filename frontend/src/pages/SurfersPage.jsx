import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Center,
  Input,
  Text,
} from '@chakra-ui/react';
import SurferProCard from '../components/SurferProCard';

export default function SurfersPage() {
  const [surfers, setSurfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  // filter by searchTerm
  const filtered = surfers.filter(s =>
    s.name.toLowerCase().includes(searchTerm)
  );

  // pick one random featured for default view
  const featuredIndex = Math.floor(Math.random() * surfers.length);
  const featured = surfers[featuredIndex];

  return (
    <Box px={[4, 8]} py={6}>
      {/* Search bar */}
      <Input
        placeholder="Search surfers by name…"
        mb={6}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value.toLowerCase())}
      />

      {searchTerm ? (
        <>
          <Heading mb={4}>Search Results</Heading>
          {filtered.length ? (
            filtered.map(s => (
              <SurferProCard key={s._id} surfer={s} />
            ))
          ) : (
            <Text>No surfers match “{searchTerm}.”</Text>
          )}
        </>
      ) : (
        <>
          <Heading mb={6}>🏄 Featured Surfer</Heading>
          <SurferProCard surfer={featured} />
        </>
      )}
    </Box>
  );
}
