// frontend/src/components/ColorModeSwitcher.jsx
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaMoon, FaSun } from "react-icons/fa";

export const ColorModeSwitcher = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <IconButton
      aria-label="Toggle light/dark mode"
      icon={isDark ? <FaSun /> : <FaMoon />}
      onClick={toggleColorMode}
      variant="ghost"
      {...props}
    />
  );
};
