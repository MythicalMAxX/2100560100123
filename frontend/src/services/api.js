// /frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144/test';
const AUTH_URL = `${API_BASE_URL}/auth`;
const companyNames = ["AMZ", "FLP", "SNP", "MYN", "AZO"];
const authPayload = {
  companyName: "MythicalMAxX",
  clientID: "0b7dbba7-c9f5-4d0e-8751-7ab4dd512770",
  clientSecret: "OKFlNJXVYWCQgUKS",
  ownerName: "Vinamra Yadav",
  ownerEmail: "2100560100123@bbdniit.ac.in",
  rollNo: "2100560100123"
};

async function fetchAuthToken() {
  try {
    const response = await axios.post(AUTH_URL, authPayload);
    return response.data.access_token;
  } catch (error) {
    console.error("Authentication failed:", error);
    throw error;
  }
}

export async function getProducts(categoryname, n = 10, page = 1, sort_by = null, order = null, min_price = 1, max_price = 100000) {
  try {
    const token = await fetchAuthToken();
    const headers = { Authorization: `Bearer ${token}` };
    let products = [];

    for (const company of companyNames) {
      const url = `${API_BASE_URL}/companies/${company}/categories/${categoryname}/products`;
      const params = { top: n, minPrice: min_price, maxPrice: max_price };
      const response = await axios.get(url, { headers, params });
      products = products.concat(response.data);
    }

    if (sort_by) {
      products.sort((a, b) => {
        const sortVal = (sort_by === "price" || sort_by === "rating" || sort_by === "discount") ? a[sort_by] - b[sort_by] : a[sort_by].localeCompare(b[sort_by]);
        return order === "desc" ? -sortVal : sortVal;
      });
    }

    const start = (page - 1) * n;
    const end = start + n;
    return products.slice(start, end);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function getProductDetail(categoryname, productid) {
  try {
    const token = await fetchAuthToken();
    const headers = { Authorization: `Bearer ${token}` };

    for (const company of companyNames) {
      const url = `${API_BASE_URL}/companies/${company}/categories/${categoryname}/products`;
      const response = await axios.get(url, { headers });
      const product = response.data.find(p => p.id === productid);
      if (product) return product;
    }
    
    throw new Error("Product not found");
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    throw error;
  }
}
