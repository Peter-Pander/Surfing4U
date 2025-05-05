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
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

function Navbar() {
  // dynamic colors for light / dark
  const bg = useColorModeValue("gray.100", "gray.800");
  const linkColor = useColorModeValue("black", "white");
  const hoverBg = useColorModeValue("gray.200", "gray.700");

  return (
    <Box bg={bg} px={6} py={3} boxShadow="sm">
      <Flex align="center">
        {/* toggle on the far left */}
        <ColorModeSwitcher mr={4} />

        <Heading size="md" color={linkColor}>
          <RouterLink to="/">Surfing4U 🌊</RouterLink>
        </Heading>

        <Spacer />

        <HStack spacing={6}>
          <Link as={RouterLink} to="/spots" color={linkColor}>
            Spots
          </Link>
          <Link as={RouterLink} to="/surfers" color={linkColor}>
            Surfers
          </Link>
          <Link as={RouterLink} to="/events" color={linkColor}>
            Events
          </Link>
          <Link as={RouterLink} to="/forecasts" color={linkColor}>
            Forecasts
          </Link>
          <Link as={RouterLink} to="/surf-tv" color={linkColor}>
            Surf TV
          </Link>

          {/* Surf 101 Dropdown using Chakra Menu */}
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              color={linkColor}
              rightIcon={<Box as="span" ml={1}>▾</Box>}
              _hover={{ bg: hoverBg }}
            >
              Surf 101
            </MenuButton>
            <MenuList bg={bg}>
              <MenuItem as={RouterLink} to="/surf-101/glossary">
                Glossary
              </MenuItem>
              <MenuItem as={RouterLink} to="/surf-101/quiz">
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
