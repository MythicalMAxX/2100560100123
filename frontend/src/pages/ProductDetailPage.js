// /frontend/src/pages/ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductDetail } from '../services/api';
import { Typography, Card, CardContent } from '@mui/material';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      const fetchedProduct = await getProductDetail('', id);
      setProduct(fetchedProduct);
    }
    fetchProduct();
  }, [id]);

  return (
    <div>
      {product ? (
        <Card>
          <CardContent>
            <Typography variant="h5" component="div">
              {product.productName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Company: {product.company}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Category: {product.category}
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
          </CardContent>
        </Card>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </div>
  );
}

export default ProductDetailPage;
