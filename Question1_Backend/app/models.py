from pydantic import BaseModel
from typing import List, Optional

class Product(BaseModel):
    id: str
    productName: str
    price: int
    rating: float
    discount: int
    availability: str

class ProductDetail(Product):
    company: str
    category: str
