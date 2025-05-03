// frontend/src/components/Navbar.jsx
import {
  Box,
  Flex,
  HStack,
  Link,
  Spacer,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

function Navbar() {
  return (
    <Box bg="gray.100" px={6} py={3} boxShadow="sm">
      <Flex align="center">
        <Heading size="md" color="black">
          <RouterLink to="/">Surfing4U 🌊</RouterLink>
        </Heading>

        <Spacer />

        <HStack spacing={6}>
          <Link as={RouterLink} to="/spots" color="black">
            Spots
          </Link>
          <Link as={RouterLink} to="/surfers" color="black">
            Surfers
          </Link>
          <Link as={RouterLink} to="/events" color="black">
            Events
          </Link>
          <Link as={RouterLink} to="/forecasts" color="black">
            Forecasts
          </Link>
          <Link as={RouterLink} to="/surf-tv" color="black">
            Surf TV
          </Link>

          {/* Surf 101 Dropdown using Chakra Menu */}
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              color="black"
              rightIcon={<Box as="span" ml={1}>▾</Box>}
              _hover={{ bg: "gray.200" }}
            >
              Surf 101
            </MenuButton>
            <MenuList>
              <MenuItem
                as={RouterLink}
                to="/surf-101/glossary"
              >
                Glossary
              </MenuItem>
              <MenuItem
                as={RouterLink}
                to="/surf-101/techniques"
              >
                Terms & Techniques
              </MenuItem>
              <MenuItem
                as={RouterLink}
                to="/surf-101/quiz"
              >
                Quiz Game
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
