// frontend/src/components/SearchBar.jsx
import { Input } from "@chakra-ui/react";

export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <Input
      placeholder={placeholder}
      mb={4}
      value={value}
      onChange={onChange}
    />
  );
}
