// /frontend/src/components/ProductCard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.productName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Price: ${product.price}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Rating: {product.rating}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Discount: {product.discount}%
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Availability: {product.availability ? "In stock" : "Out of stock"}
        </Typography>
        <Link to={`/product/${product.id}`}>View Details</Link>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
