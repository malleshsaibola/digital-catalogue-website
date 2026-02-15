import { describe, it, expect } from 'vitest';
import { getAllProducts, getProductById } from '@/lib/products';

describe('Product Loading Functions', () => {
  describe('getAllProducts', () => {
    it('should return an array of products', () => {
      const products = getAllProducts();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThan(0);
    });

    it('should return products with required fields', () => {
      const products = getAllProducts();
      const product = products[0];
      
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('specifications');
      expect(product).toHaveProperty('image');
    });

    it('should return products with valid specifications object', () => {
      const products = getAllProducts();
      const product = products[0];
      
      expect(typeof product.specifications).toBe('object');
      expect(Object.keys(product.specifications).length).toBeGreaterThan(0);
    });
  });

  describe('getProductById', () => {
    it('should return a product when given a valid ID', () => {
      const product = getProductById('solar-panel-550w');
      
      expect(product).toBeDefined();
      expect(product?.id).toBe('solar-panel-550w');
      expect(product?.name).toBe('550W Monocrystalline Solar Panel');
    });

    it('should return undefined for non-existent product ID', () => {
      const product = getProductById('non-existent-id');
      
      expect(product).toBeUndefined();
    });

    it('should return undefined for empty string ID', () => {
      const product = getProductById('');
      
      expect(product).toBeUndefined();
    });

    it('should handle case-sensitive IDs correctly', () => {
      const product = getProductById('SOLAR-PANEL-550W');
      
      expect(product).toBeUndefined();
    });
  });
});
