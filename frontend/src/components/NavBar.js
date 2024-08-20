// /frontend/src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div">
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Top N Products</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
