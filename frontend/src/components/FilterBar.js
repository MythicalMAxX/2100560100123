// /frontend/src/components/FilterBar.js
import React from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';

function FilterBar({ filters, onFilterChange, onApplyFilters }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 2 }}>
      <TextField
        label="Category"
        select
        value={filters.category}
        onChange={(e) => onFilterChange('category', e.target.value)}
      >
        {/* Options for categories */}
        <MenuItem value="Electronics">Electronics</MenuItem>
        <MenuItem value="Clothing">Clothing</MenuItem>
        {/* Add more categories */}
      </TextField>
      <TextField
        label="Min Price"
        type="number"
        value={filters.minPrice}
        onChange={(e) => onFilterChange('minPrice', e.target.value)}
      />
      <TextField
        label="Max Price"
        type="number"
        value={filters.maxPrice}
        onChange={(e) => onFilterChange('maxPrice', e.target.value)}
      />
      <TextField
        label="Company"
        select
        value={filters.company}
        onChange={(e) => onFilterChange('company', e.target.value)}
      >
        {/* Options for companies */}
        <MenuItem value="AMZ">Amazon</MenuItem>
        <MenuItem value="FLP">Flipkart</MenuItem>
        {/* Add more companies */}
      </TextField>
      <TextField
        label="Rating"
        type="number"
        value={filters.rating}
        onChange={(e) => onFilterChange('rating', e.target.value)}
      />
      <Button variant="contained" onClick={onApplyFilters}>Apply Filters</Button>
    </Box>
  );
}

export default FilterBar;
