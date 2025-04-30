// frontend/src/components/Navbar.jsx
import { Box, Flex, HStack, Link, Spacer, Heading } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
  return (
    <Box bg="gray.100" px={6} py={3} boxShadow="sm">
      <Flex align="center">
        <Heading size="md">
          <RouterLink to="/">Surfing4U 🌊</RouterLink>
        </Heading>

        <Spacer />

        <HStack spacing={6}>
          <Link as={RouterLink} to="/spots">Spots</Link>
          <Link as={RouterLink} to="/surfers">Surfers</Link>
          <Link as={RouterLink} to="/events">Events</Link>
          <Link as={RouterLink} to="/forecasts">Forecasts</Link>

          {/* Surf TV Dropdown */}
          <Box position="relative" _hover={{ ".dropdown": { display: "block" } }}>
            <Link as={RouterLink} to="#">Surf TV ▾</Link>
            <Box
              className="dropdown"
              display="none"
              position="absolute"
              mt={2}
              bg="white"
              boxShadow="md"
              rounded="md"
              py={2}
            >
              <Link
                as={RouterLink}
                to="/surf-tv/recommendations"
                display="block"
                px={4}
                py={2}
                _hover={{ bg: "gray.100" }}
              >
                Recommendations
              </Link>
              <Link
                as={RouterLink}
                to="/surf-tv/chill-watch"
                display="block"
                px={4}
                py={2}
                _hover={{ bg: "gray.100" }}
              >
                Chill & Watch
              </Link>
            </Box>
          </Box>

          {/* Surf 101 Dropdown */}
          <Box position="relative" _hover={{ ".dropdown2": { display: "block" } }}>
            <Link as={RouterLink} to="#">Surf 101 ▾</Link>
            <Box
              className="dropdown2"
              display="none"
              position="absolute"
              mt={2}
              bg="white"
              boxShadow="md"
              rounded="md"
              py={2}
            >
              <Link
                as={RouterLink}
                to="/surf-101/glossary"
                display="block"
                px={4}
                py={2}
                _hover={{ bg: "gray.100" }}
              >
                Glossary
              </Link>
              <Link
                as={RouterLink}
                to="/surf-101/techniques"
                display="block"
                px={4}
                py={2}
                _hover={{ bg: "gray.100" }}
              >
                Terms & Techniques
              </Link>
              <Link
                as={RouterLink}
                to="/surf-101/quiz"
                display="block"
                px={4}
                py={2}
                _hover={{ bg: "gray.100" }}
              >
                Quiz Game
              </Link>
            </Box>
          </Box>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
