// /frontend/src/pages/AllProductsPage.js
import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import { Grid, Pagination } from '@mui/material';

function AllProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: 1,
    maxPrice: 100000,
    company: '',
    rating: '',
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts(filters.category, 10, page, null, null, filters.minPrice, filters.maxPrice);
    setProducts(fetchedProducts);
    setTotalPages(Math.ceil(fetchedProducts.length / 10)); // Calculate total pages
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, page]);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div>
      <FilterBar filters={filters} onFilterChange={handleFilterChange} onApplyFilters={fetchProducts} />
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={totalPages} page={page} onChange={(e, value) => setPage(value)} />
    </div>
  );
}

export default AllProductsPage;
