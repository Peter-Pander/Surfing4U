// frontend/src/components/VideoFilterBar.jsx
import { HStack, Select, Checkbox } from "@chakra-ui/react";

export default function VideoFilterBar({
  filter,
  sortBy,
  onFilterChange,
  onSortChange,
}) {
  const { type = null, recommended = null } = filter;

  const handleTypeChange = (e) => {
    const newType = e.target.value || null;
    onFilterChange({ ...filter, type: newType });
  };

  const handleRecommendedToggle = (e) => {
    // if checked ⇒ show only recommended, otherwise clear the filter
    const newRecommended = e.target.checked ? true : null;
    onFilterChange({ ...filter, recommended: newRecommended });
  };

  const handleSortChange = (e) => {
    const newSort = e.target.value || null;
    onSortChange(newSort);
  };

  return (
    <HStack spacing={4} mb={6}>
      {/* Type selector */}
      <Select
        width="200px"
        value={type || ""}
        onChange={handleTypeChange}
        placeholder="All Types"
      >
        <option value="Movie">Movies</option>
        <option value="TV Show">TV Shows</option>
        <option value="Documentary">Documentaries</option>
      </Select>

      {/* Recommended only */}
      <Checkbox
        isChecked={recommended === true}
        onChange={handleRecommendedToggle}
      >
        Recommended Only
      </Checkbox>

      {/* Optional sort: recommended first */}
      <Select
        width="200px"
        value={sortBy || ""}
        onChange={handleSortChange}
        placeholder="No Sort"
      >
        <option value="recommendedFirst">Recommended First</option>
      </Select>
    </HStack>
  );
}
