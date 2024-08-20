// src/components/FetchButton.js
import React from 'react';
import Button from '@mui/material/Button';

const FetchButton = ({ onClick }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick}>
      Fetch Products
    </Button>
  );
};

export default FetchButton;
