// frontend/src/components/Navbar.jsx
import {
  Box,
  Flex,
  HStack,
  Link,
  Spacer,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function Navbar() {
  // dynamic colors for light / dark
  const bg         = useColorModeValue("gray.100", "gray.100");
  const linkColor  = useColorModeValue("black",    "black");
  const hoverBg    = useColorModeValue("gray.200", "gray.200");

  return (
    <Box bg={bg} px={6} py={3} boxShadow="sm">
      <Flex align="center">
        {/* toggle on the far left */}
        <ColorModeSwitcher mr={4} color={linkColor} />

        <Heading size="md" color={linkColor}>
          <RouterLink to="/">Surfing4U 🌊</RouterLink>
        </Heading>

        <Spacer />

        <HStack spacing={6}>
          <Link
            as={RouterLink}
            to="/spots"
            color={linkColor}
            _hover={{ bg: hoverBg }}
          >
            Spots
          </Link>
          <Link
            as={RouterLink}
            to="/surfers"
            color={linkColor}
            _hover={{ bg: hoverBg }}
          >
            Surfers
          </Link>
          <Link
            as={RouterLink}
            to="/events"
            color={linkColor}
            _hover={{ bg: hoverBg }}
          >
            Events
          </Link>
          <Link
            as={RouterLink}
            to="/forecasts"
            color={linkColor}
            _hover={{ bg: hoverBg }}
          >
            Forecasts
          </Link>
          <Link
            as={RouterLink}
            to="/surf-tv"
            color={linkColor}
            _hover={{ bg: hoverBg }}
          >
            Surf TV
          </Link>

          {/* now separate Glossary and Quiz Game links instead of a dropdown */}
          <Link
            as={RouterLink}
            to="/surf-101/glossary"
            color={linkColor}
            _hover={{ bg: hoverBg }}
          >
            Glossary
          </Link>
          <Link
            as={RouterLink}
            to="/surf-101/quiz"
            color={linkColor}
            _hover={{ bg: hoverBg }}
          >
            Quiz Game
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
