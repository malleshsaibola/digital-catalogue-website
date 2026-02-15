// Product data loading utilities

import { Product } from './types';
import productsData from '@/data/products.json';

/**
 * Get all products from the data source
 * @returns Array of all products
 */
export function getAllProducts(): Product[] {
  return productsData as Product[];
}

/**
 * Get a single product by its ID
 * @param id - The product ID to search for
 * @returns The product if found, undefined otherwise
 */
export function getProductById(id: string): Product | undefined {
  return productsData.find((p) => p.id === id) as Product | undefined;
}
