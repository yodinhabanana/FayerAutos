export interface Product {
  id: number;
  productName: string;
  price: number;
  stockQuantity: number;
  productCategoryId: number;
  
  
  brand: string;
  sku?: string;
  description?: string;

  imageUrl?: string;
  category?: string;
  isFeatured?: boolean;

}