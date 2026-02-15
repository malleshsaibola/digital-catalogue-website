import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProductDetailPage from '@/app/products/[id]/page';
import { getProductById } from '@/lib/products';

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}));

vi.mock('next/image', () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} />
  ),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

describe('Product Detail Page', () => {
  it('should display product name and description', () => {
    const params = { id: 'solar-panel-550w' };
    render(<ProductDetailPage params={params} />);
    
    expect(screen.getByText('550W Monocrystalline Solar Panel')).toBeDefined();
    expect(screen.getByText(/High-efficiency monocrystalline solar panel/)).toBeDefined();
  });

  it('should display all product specifications', () => {
    const params = { id: 'solar-panel-550w' };
    const product = getProductById(params.id);
    
    render(<ProductDetailPage params={params} />);
    
    // Check that specifications section exists
    expect(screen.getByText('Specifications')).toBeDefined();
    
    // Check that all specification keys and values are displayed
    if (product) {
      Object.entries(product.specifications).forEach(([key, value]) => {
        expect(screen.getByText(key)).toBeDefined();
        expect(screen.getByText(value)).toBeDefined();
      });
    }
  });

  it('should display product image with correct alt text', () => {
    const params = { id: 'hybrid-inverter-5kw' };
    render(<ProductDetailPage params={params} />);
    
    const image = screen.getByAltText('5kW Hybrid Solar Inverter');
    expect(image).toBeDefined();
  });

  it('should display back to products link', () => {
    const params = { id: 'solar-panel-550w' };
    render(<ProductDetailPage params={params} />);
    
    const backLink = screen.getByText('Back to Products');
    expect(backLink).toBeDefined();
    expect(backLink.closest('a')?.getAttribute('href')).toBe('/products');
  });

  it('should display contact CTA button', () => {
    const params = { id: 'lithium-battery-10kwh' };
    render(<ProductDetailPage params={params} />);
    
    const contactButton = screen.getByText('Contact Us About This Product');
    expect(contactButton).toBeDefined();
    expect(contactButton.closest('a')?.getAttribute('href')).toBe('/contact');
  });

  it('should call notFound for invalid product ID', async () => {
    const { notFound } = await import('next/navigation');
    // Make notFound throw an error to simulate Next.js behavior
    vi.mocked(notFound).mockImplementation(() => {
      throw new Error('NEXT_NOT_FOUND');
    });
    
    const params = { id: 'invalid-product-id' };
    
    // Expect the component to throw when notFound is called
    expect(() => render(<ProductDetailPage params={params} />)).toThrow();
    expect(notFound).toHaveBeenCalled();
  });

  it('should handle different product types correctly', () => {
    // Test with battery product
    const batteryParams = { id: 'lithium-battery-10kwh' };
    const { unmount } = render(<ProductDetailPage params={batteryParams} />);
    
    expect(screen.getByText('10kWh Lithium Battery Storage')).toBeDefined();
    expect(screen.getByText('Capacity')).toBeDefined();
    
    unmount();
    
    // Test with inverter product
    const inverterParams = { id: 'hybrid-inverter-5kw' };
    render(<ProductDetailPage params={inverterParams} />);
    
    expect(screen.getByText('5kW Hybrid Solar Inverter')).toBeDefined();
    expect(screen.getByText('Power Rating')).toBeDefined();
  });
});
