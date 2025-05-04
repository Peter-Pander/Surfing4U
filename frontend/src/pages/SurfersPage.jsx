import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Heading,
  Spinner,
  Center,
  Input,
  Text,
  List,
  ListItem,
  Button,
  HStack,
} from '@chakra-ui/react';
import SurferProCard from '../components/SurferProCard';

export default function SurfersPage() {
  const [surfers, setSurfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const inputRef = useRef();

  useEffect(() => {
    fetch('/api/surfers')
      .then((res) => res.json())
      .then((data) => {
        setSurfers(data);
        setLoading(false);
        // pick one random featured on full page load only
        const randomIndex = Math.floor(Math.random() * data.length);
        setCurrentIndex(randomIndex);
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

  // filter by searchTerm (or return all if searchTerm is empty)
  const filtered = searchTerm
    ? surfers.filter((s) => s.name.toLowerCase().includes(searchTerm))
    : surfers;

  // handle keyboard navigation
  const onKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      // find the real index in the full list
      const selected = filtered[activeIndex];
      const idx = surfers.findIndex((s) => s._id === selected._id);
      setCurrentIndex(idx);
      setSearchTerm('');      // clear so we show the featured view
      setIsOpen(false);
      setActiveIndex(-1);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <Box px={[4, 8]} py={6} position="relative">
      {/* Search bar */}
      <Input
        placeholder="Search surfers by name…"
        mb={6}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value.toLowerCase());
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onFocus={() => {
          setIsOpen(true);
          setActiveIndex(-1);
        }}
        onBlur={() => setTimeout(() => setIsOpen(false), 100)}
        onKeyDown={onKeyDown}
        ref={inputRef}
        autoComplete="off"
      />

      {/* custom dropdown */}
      {isOpen && filtered.length > 0 && (
        <Box
          position="absolute"
          top="66px"
          left="8"
          right="8"
          bg="gray.700"
          borderRadius="md"
          shadow="lg"
          maxH="250px"
          overflowY="auto"
          zIndex={10}
        >
          <List spacing={0}>
            {filtered.map((s, idx) => (
              <ListItem
                key={s._id}
                px={4}
                py={2}
                cursor="pointer"
                bg={idx === activeIndex ? 'gray.600' : 'transparent'}
                _hover={{ bg: 'gray.600' }}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={() => {
                  // same logic as Enter above
                  const realIdx = surfers.findIndex((x) => x._id === s._id);
                  setCurrentIndex(realIdx);
                  setSearchTerm('');
                  setIsOpen(false);
                  setActiveIndex(-1);
                }}
              >
                {s.name}
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {searchTerm ? (
        <>
          <Heading mb={4}>Search Results</Heading>
          {filtered.length ? (
            filtered.map((s) => <SurferProCard key={s._id} surfer={s} />)
          ) : (
            <Text>No surfers match “{searchTerm}.”</Text>
          )}
        </>
      ) : (
        <>
          {currentIndex >= 0 && (
            <>
              {/* Featured header and navigation */}
              <HStack justify="space-between" align="center" mb={6}>
                <Heading size="lg">🏄 Featured Surfer</Heading>
                <HStack spacing={4}>
                  <Button
                    onClick={() => setCurrentIndex((i) => i - 1)}
                    isDisabled={currentIndex <= 0}
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentIndex((i) => i + 1)}
                    isDisabled={currentIndex >= surfers.length - 1}
                  >
                    Next
                  </Button>
                </HStack>
              </HStack>
              <SurferProCard surfer={surfers[currentIndex]} />
            </>
          )}
        </>
      )}
    </Box>
  );
}
