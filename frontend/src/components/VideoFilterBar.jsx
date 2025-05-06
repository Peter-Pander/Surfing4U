// frontend/src/components/VideoFilterBar.jsx
import { HStack, Select } from "@chakra-ui/react";

export default function VideoFilterBar({ type, onTypeChange }) {
  return (
    <HStack spacing={4} mb={6}>
      <Select
        width="200px"
        value={type || ""}
        onChange={(e) => onTypeChange(e.target.value || null)}
        placeholder="All Surf TV"
      >
        <option value="Documentary">Documentaries</option>
        <option value="Reality TV">Reality TV</option>
        <option value="TV Show">TV Shows</option>
        <option value="Movie">Movies</option>
        <option value="Recommended">Recommendations</option>
      </Select>
    </HStack>
  );
}
