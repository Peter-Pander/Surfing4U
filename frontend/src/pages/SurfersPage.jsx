// frontend/src/pages/SurfersPage.jsx
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
  useColorModeValue,
} from '@chakra-ui/react';
import SurferProCard from '../components/SurferProCard';

export default function SurfersPage() {
  // dynamic light / dark values (hooks must run before any early return)
  const pageBg          = useColorModeValue('gray.50', 'gray.900');
  const textColor       = useColorModeValue('gray.800', 'gray.100');
  const inputBg         = useColorModeValue('white',    'gray.700');
  const dropdownBg      = useColorModeValue('white',    'gray.700');
  const dropdownHoverBg = useColorModeValue('gray.100', 'gray.600');
  const activeBg        = useColorModeValue('gray.200', 'gray.600');

  const [surfers, setSurfers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ track the raw input value and the debounced search term
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm]   = useState('');

  // grouping by alphabet ranges
  const ranges = [
    { label: 'A–D', from: 'A', to: 'D' },
    { label: 'E–H', from: 'E', to: 'H' },
    { label: 'I–L', from: 'I', to: 'L' },
    { label: 'M–P', from: 'M', to: 'P' },
    { label: 'Q–T', from: 'Q', to: 'T' },
    { label: 'U–Z', from: 'U', to: 'Z' },
  ];
  const [activeRange, setActiveRange] = useState(null);
  const [rangeIndex, setRangeIndex] = useState(0);

  // Only enable admin UI in development builds
  const isAdmin = import.meta.env.VITE_ENABLE_ADMIN === 'true';

  // debounce updating `searchTerm` until 200ms after the user stops typing
  useEffect(() => {
    const handler = setTimeout(() => setSearchTerm(inputValue), 200);
    return () => clearTimeout(handler);
  }, [inputValue]);

  const [isOpen, setIsOpen]         = useState(false);
  const [activeIndex, setActiveIndex]   = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const inputRef = useRef();

  useEffect(() => {
    fetch('/api/surfers')
      .then((res) => res.json())
      .then((data) => {
        setSurfers(data);
        setLoading(false);
        // pick one random featured on full page load only
        setCurrentIndex(Math.floor(Math.random() * data.length));
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center h="60vh" bg={pageBg} color={textColor}>
        <Spinner size="xl" />
      </Center>
    );
  }

  if (!surfers.length) {
    return <Heading color={textColor}>No surfers found.</Heading>;
  }

  // filter by debounced searchTerm (or return all if empty)
  const filtered = searchTerm
    ? surfers.filter((s) =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : surfers;

  // filter by active alphabet range (only when no searchTerm)
  const rangeFiltered = activeRange
    ? surfers.filter((s) => {
        const first = s.name[0].toUpperCase();
        return first >= activeRange.from && first <= activeRange.to;
      })
    : [];

  // handle keyboard navigation in dropdown
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
      setInputValue(''); // clear raw input
      // clear any active range
      setActiveRange(null);
      setRangeIndex(0);
      setIsOpen(false);
      setActiveIndex(-1);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setActiveIndex(-1);
    }
  };

  // callback to merge an updated surfer back into our list
  const handleUpdate = (updated) => {
    setSurfers((all) =>
      all.map((s) => (s._id === updated._id ? updated : s))
    );
    // keep showing the same surfer
    const newIndex = surfers.findIndex((s) => s._id === updated._id);
    if (newIndex >= 0) setCurrentIndex(newIndex);
  };

  return (
    <Box
      px={[4, 8]}
      py={6}
      position="relative"
      bg={pageBg}
      color={textColor}
    >
      {/* Search bar */}
      <Input
        placeholder="Search surfers by name…"
        mb={6}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          // clear any active range when searching
          setActiveRange(null);
          setRangeIndex(0);
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
        bg={inputBg}
        color={textColor}
      />

      {/* custom dropdown */}
      {isOpen && filtered.length > 0 && (
        <Box
          position="absolute"
          top="66px"
          left="8"
          right="8"
          bg={dropdownBg}
          color={textColor}
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
                bg={idx === activeIndex ? activeBg : 'transparent'}
                _hover={{ bg: dropdownHoverBg }}
                onMouseEnter={() => setActiveIndex(idx)}
                onMouseDown={() => {
                  const realIdx = surfers.findIndex((x) => x._id === s._id);
                  setCurrentIndex(realIdx);
                  setInputValue(''); // clear raw input
                  // clear any active range
                  setActiveRange(null);
                  setRangeIndex(0);
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
            filtered.map((s) => (
              <SurferProCard
                key={s._id}
                surfer={s}
                isAdmin={isAdmin}
                onUpdate={handleUpdate}
              />
            ))
          ) : (
            <Text>No surfers match “{searchTerm}.”</Text>
          )}
        </>
      ) : activeRange ? (
        <>
          {/* Range header and navigation */}
          <HStack justify="space-between" align="center" mb={6}>
            <Heading size="lg">Surfers {activeRange.label}</Heading>
            <HStack spacing={4}>
              <Button
                onClick={() => setRangeIndex((i) => Math.max(i - 1, 0))}
                isDisabled={rangeIndex === 0}
              >
                Previous
              </Button>
              <Button
                onClick={() =>
                  setRangeIndex((i) =>
                    Math.min(i + 1, rangeFiltered.length - 1)
                  )
                }
                isDisabled={rangeIndex >= rangeFiltered.length - 1}
              >
                Next
              </Button>
            </HStack>
          </HStack>
          {rangeFiltered.length ? (
            <SurferProCard
              surfer={rangeFiltered[rangeIndex]}
              isAdmin={isAdmin}
              onUpdate={handleUpdate}
            />
          ) : (
            <Text>No surfers in “{activeRange.label}.”</Text>
          )}
        </>
      ) : (
        <>
          {currentIndex >= 0 && (
            <>
              {/* Range filters and global navigation */}
              <HStack justify="space-between" align="center" mb={6}>
                <HStack spacing={2}>
                  {ranges.map((r) => (
                    <Button
                      key={r.label}
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setActiveRange(r);
                        setRangeIndex(0);
                        setInputValue('');
                        setSearchTerm('');
                        setIsOpen(false);
                        setActiveIndex(-1);
                      }}
                    >
                      {r.label}
                    </Button>
                  ))}
                </HStack>
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
              <SurferProCard
                surfer={surfers[currentIndex]}
                isAdmin={isAdmin}
                onUpdate={handleUpdate}
              />
            </>
          )}
        </>
      )}
    </Box>
  );
}
