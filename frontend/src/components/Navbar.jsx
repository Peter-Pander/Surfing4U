// frontend/src/components/Navbar.jsx
import {
  Box,
  Flex,
  HStack,
  Link,
  Spacer,
  Heading,
  IconButton,
  Collapse,
  Stack,
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function Navbar() {
  // controls for mobile collapse
  const { isOpen, onToggle } = useDisclosure();

  // dynamic colors for light / dark
  const bg        = useColorModeValue("gray.100", "gray.100");
  const linkColor = useColorModeValue("black",    "black");
  const hoverBg   = useColorModeValue("gray.200", "gray.200");

  // your nav links array to DRY up a bit
  const navLinks = [
    { label: "Spots",     to: "/spots" },
    { label: "Surfers",   to: "/surfers" },
    { label: "Events",    to: "/events" },
    { label: "Forecasts", to: "/forecasts" },
    { label: "Surf TV",   to: "/surf-tv" },
    { label: "Glossary",  to: "/surf-101/glossary" },
    { label: "Quiz Game", to: "/surf-101/quiz" },
  ];

  return (
    <Box bg={bg} px={6} py={3} boxShadow="sm">
      <Flex align="center">
        {/* toggle on the far left */}
        <ColorModeSwitcher mr={4} color={linkColor} />

        <Heading size="md" color={linkColor}>
          <RouterLink to="/">Surfing4U 🌊</RouterLink>
        </Heading>

        <Spacer />

        {/* desktop nav: hidden on mobile */}
        <HStack spacing={6} display={{ base: "none", md: "flex" }}>
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              as={RouterLink}
              to={to}
              color={linkColor}
              _hover={{ bg: hoverBg }}
            >
              {label}
            </Link>
          ))}
        </HStack>

        {/* mobile hamburger */}
        <IconButton
          aria-label="Toggle menu"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          variant="ghost"
          color={linkColor}
          display={{ base: "flex", md: "none" }}
          onClick={onToggle}
        />
      </Flex>

      {/* mobile collapse menu (now left-aligned) */}
      <Collapse in={isOpen} animateOpacity>
        <Box pt={2} pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={2}>
            {navLinks.map(({ label, to }) => (
              <Link
                key={label}
                as={RouterLink}
                to={to}
                color={linkColor}
                _hover={{ bg: hoverBg }}
                onClick={onToggle}
              >
                {label}
              </Link>
            ))}
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
}

export default Navbar;
