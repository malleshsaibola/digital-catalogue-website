import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductsPage from '@/app/products/page';
import * as productsModule from '@/lib/products';

// Mock Next.js Image component
vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

// Mock Next.js Link component
vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('Products Page', () => {
  it('should display page title and description', () => {
    render(<ProductsPage />);
    
    expect(screen.getByText('Our Products')).toBeDefined();
    expect(screen.getByText(/Explore our range of high-quality renewable energy solutions/)).toBeDefined();
  });

  it('should load and display all products using getAllProducts() (Requirement 3.1)', () => {
    render(<ProductsPage />);
    
    const products = productsModule.getAllProducts();
    
    // Check that products are displayed
    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeDefined();
    });
  });

  it('should display products in a grid layout (Requirement 3.1)', () => {
    const { container } = render(<ProductsPage />);
    
    // Check for grid container
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeDefined();
    
    // Check for responsive grid classes
    expect(gridContainer?.className).toMatch(/grid-cols-1/);
    expect(gridContainer?.className).toMatch(/md:grid-cols-2/);
    expect(gridContainer?.className).toMatch(/lg:grid-cols-3/);
  });

  it('should handle empty product list gracefully (Requirement 3.1)', () => {
    // Mock getAllProducts to return empty array
    vi.spyOn(productsModule, 'getAllProducts').mockReturnValue([]);
    
    render(<ProductsPage />);
    
    expect(screen.getByText('No products available at the moment.')).toBeDefined();
    
    // Restore original implementation
    vi.restoreAllMocks();
  });

  it('should display correct number of products', () => {
    render(<ProductsPage />);
    
    const products = productsModule.getAllProducts();
    const productCards = screen.getAllByRole('link');
    
    // Each product should have a link
    expect(productCards.length).toBe(products.length);
  });

  it('should render ProductCard components for each product', () => {
    render(<ProductsPage />);
    
    const products = productsModule.getAllProducts();
    
    // Check that each product's name is displayed (ProductCard displays name)
    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeDefined();
    });
  });
});
