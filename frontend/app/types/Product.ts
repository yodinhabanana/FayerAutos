export interface Product {
  id: number;
  productName: string;
  price: number;
  stockQuantity: number;
  brand: string;
  sku: string;
  description?: string;
  productCategoryId: number;
}