import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductCard } from '@/components/ProductCard';
import type { Product } from '@/lib/types';

describe('Image Placeholder Handling', () => {
  const mockProduct: Product = {
    id: 'test-1',
    name: 'Test Product',
    description: 'Test description',
    specifications: { Power: '100W' },
    image: '/images/test.jpg',
  };

  it('should display placeholder when product has no image', () => {
    const productWithoutImage = { ...mockProduct, image: '' };
    render(<ProductCard product={productWithoutImage} />);
    
    expect(screen.getByText('Image not available')).toBeInTheDocument();
  });

  it('should display image when product has valid image path', () => {
    render(<ProductCard product={mockProduct} />);
    
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
  });
});
