import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/lib/types';

describe('ProductCard Component', () => {
  const mockProduct: Product = {
    id: 'test-product',
    name: 'Test Solar Panel',
    description: 'A high-quality solar panel for testing purposes',
    specifications: {
      'Power': '500W',
      'Efficiency': '20%'
    },
    image: 'https://example.com/test-image.jpg'
  };

  it('should display product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Solar Panel')).toBeDefined();
  });

  it('should display product description', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('A high-quality solar panel for testing purposes')).toBeDefined();
  });

  it('should display product image with correct alt text', () => {
    render(<ProductCard product={mockProduct} />);
    const image = screen.getByAltText('Test Solar Panel');
    expect(image).toBeDefined();
  });

  it('should link to product detail page', () => {
    render(<ProductCard product={mockProduct} />);
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/products/test-product');
  });

  it('should display all required information (Requirement 3.2)', () => {
    render(<ProductCard product={mockProduct} />);
    
    // Product name
    expect(screen.getByText('Test Solar Panel')).toBeDefined();
    
    // Product description
    expect(screen.getByText('A high-quality solar panel for testing purposes')).toBeDefined();
    
    // Product image
    const image = screen.getByAltText('Test Solar Panel');
    expect(image).toBeDefined();
    
    // Link to detail page
    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toBe('/products/test-product');
  });

  it('should handle long descriptions gracefully', () => {
    const longDescProduct: Product = {
      ...mockProduct,
      description: 'This is a very long description that should be truncated or handled properly by the component. '.repeat(10)
    };
    
    render(<ProductCard product={longDescProduct} />);
    expect(screen.getByText(/This is a very long description/)).toBeDefined();
  });

  it('should not display price information (Requirement 3.4)', () => {
    render(<ProductCard product={mockProduct} />);
    const cardText = screen.getByRole('link').textContent;
    
    // Check that common price indicators are not present
    expect(cardText).not.toMatch(/\$|€|£|price|cost/i);
  });

  it('should display placeholder when image is missing', () => {
    const productWithoutImage: Product = {
      ...mockProduct,
      image: ''
    };
    
    render(<ProductCard product={productWithoutImage} />);
    
    // Should display placeholder text
    expect(screen.getByText('Image not available')).toBeDefined();
  });

  it('should handle image load errors gracefully (Requirement 5.3)', () => {
    const productWithBrokenImage: Product = {
      ...mockProduct,
      image: 'https://invalid-url.com/broken-image.jpg'
    };
    
    render(<ProductCard product={productWithBrokenImage} />);
    
    // The component should render without crashing
    expect(screen.getByText('Test Solar Panel')).toBeDefined();
    expect(screen.getByText('A high-quality solar panel for testing purposes')).toBeDefined();
  });
});
