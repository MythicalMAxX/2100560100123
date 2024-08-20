import logging
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
import requests
import uuid
import json

from .models import Product, ProductDetail

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

API_BASE_URL = "http://20.244.56.144/test"
AUTH_URL = "http://20.244.56.144/test/auth"

# Authentication credentials
AUTH_PAYLOAD = {
    "companyName": "MythicalMAxX",
    "clientID": "0b7dbba7-c9f5-4d0e-8751-7ab4dd512770",
    "clientSecret": "OKFlNJXVYWCQgUKS",
    "ownerName": "Vinamra Yadav",
    "ownerEmail": "2100560100123@bbdniit.ac.in",
    "rollNo": "2100560100123"
}

# Helper function to generate unique product IDs
def generate_product_id(company: str, product_name: str) -> str:
    return str(uuid.uuid5(uuid.NAMESPACE_DNS, f"{company}-{product_name}"))

# Helper function to fetch a new authentication token
def fetch_auth_token() -> str:
    try:
        auth_response = requests.post(AUTH_URL, json=AUTH_PAYLOAD)
        auth_response.raise_for_status()  # Check for HTTP errors
        auth_data = auth_response.json()
        return auth_data["access_token"]
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch authentication token: {e}")
        raise HTTPException(status_code=500, detail="Authentication failed")

@router.get("/categories/{categoryname}/products", response_model=List[Product])
async def get_products(categoryname: str, 
                       n: int = 10, 
                       page: int = 1, 
                       sort_by: Optional[str] = Query(None, regex="^(price|rating|discount|company)$"),
                       order: Optional[str] = Query(None, regex="^(asc|desc)$"),
                       min_price: Optional[int] = 1,
                       max_price: Optional[int] = 100000):
    company_names = ["AMZ", "FLP", "SNP", "MYN", "AZO"]
    products = []
    
    # Fetch a new authentication token
    access_token = fetch_auth_token()
    headers = {"Authorization": f"Bearer {access_token}"}

    for company in company_names:
        url = f"{API_BASE_URL}/companies/{company}/categories/{categoryname}/products"
        params = {"top": n, "minPrice": min_price, "maxPrice": max_price}
        try:
            response = requests.get(url, headers=headers, params=params)
            response.raise_for_status()
            data = response.json()
            for product in data:
                product_id = generate_product_id(company, product["productName"])
                products.append(Product(
                    id=product_id,
                    productName=product["productName"],
                    price=product["price"],
                    rating=product["rating"],
                    discount=product["discount"],
                    availability=product["availability"]
                ))
        except requests.exceptions.HTTPError as http_err:
            logger.error(f"HTTP error occurred: {http_err}")
            logger.error(f"Response content: {response.text}")
            raise HTTPException(status_code=500, detail=f"Error fetching data from {company}")
        except Exception as err:
            logger.error(f"Other error occurred: {err}")
            raise HTTPException(status_code=500, detail=f"Error fetching data from {company}")

    # Sorting logic
    if sort_by:
        reverse = True if order == "desc" else False
        products.sort(key=lambda x: getattr(x, sort_by), reverse=reverse)

    # Pagination logic
    start = (page - 1) * n
    end = start + n
    return products[start:end]

@router.get("/categories/{categoryname}/products/{productid}", response_model=ProductDetail)
async def get_product_detail(categoryname: str, productid: str):
    # Fetch a new authentication token
    access_token = fetch_auth_token()
    headers = {"Authorization": f"Bearer {access_token}"}
    company_names = ["AMZ", "FLP", "SNP", "MYN", "AZO"]
    
    for company in company_names:
        url = f"{API_BASE_URL}/companies/{company}/categories/{categoryname}/products"
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            data = response.json()
            for product in data:
                generated_id = generate_product_id(company, product["productName"])
                if generated_id == productid:
                    return ProductDetail(
                        id=generated_id,
                        productName=product["productName"],
                        price=product["price"],
                        rating=product["rating"],
                        discount=product["discount"],
                        availability=product["availability"],
                        company=company,
                        category=categoryname
                    )
        except requests.exceptions.HTTPError as http_err:
            logger.error(f"HTTP error occurred: {http_err}")
            logger.error(f"Response content: {response.text}")
            raise HTTPException(status_code=500, detail=f"Error fetching data from {company}")
        except Exception as err:
            logger.error(f"Other error occurred: {err}")
            raise HTTPException(status_code=500, detail=f"Error fetching data from {company}")
    
    raise HTTPException(status_code=404, detail="Product not found")
