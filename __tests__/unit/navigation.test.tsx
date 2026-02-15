import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Navigation } from '@/components/Navigation';

// Mock Next.js navigation hooks
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(),
}));

import { usePathname } from 'next/navigation';

describe('Navigation Component', () => {
  it('should render all navigation links', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    
    render(<Navigation />);
    
    expect(screen.getByText('Home')).toBeDefined();
    expect(screen.getByText('Products')).toBeDefined();
    expect(screen.getByText('Contact')).toBeDefined();
  });

  it('should highlight the Home link when on homepage', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    
    render(<Navigation />);
    
    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink?.className).toContain('border-blue-500');
    expect(homeLink?.className).toContain('text-gray-900');
  });

  it('should highlight the Products link when on products page', () => {
    vi.mocked(usePathname).mockReturnValue('/products');
    
    render(<Navigation />);
    
    const productsLink = screen.getByText('Products').closest('a');
    expect(productsLink?.className).toContain('border-blue-500');
    expect(productsLink?.className).toContain('text-gray-900');
  });

  it('should highlight the Contact link when on contact page', () => {
    vi.mocked(usePathname).mockReturnValue('/contact');
    
    render(<Navigation />);
    
    const contactLink = screen.getByText('Contact').closest('a');
    expect(contactLink?.className).toContain('border-blue-500');
    expect(contactLink?.className).toContain('text-gray-900');
  });

  it('should not highlight inactive links', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    
    render(<Navigation />);
    
    const productsLink = screen.getByText('Products').closest('a');
    const contactLink = screen.getByText('Contact').closest('a');
    
    expect(productsLink?.className).toContain('border-transparent');
    expect(contactLink?.className).toContain('border-transparent');
  });

  it('should have correct href attributes', () => {
    vi.mocked(usePathname).mockReturnValue('/');
    
    render(<Navigation />);
    
    const homeLink = screen.getByText('Home').closest('a');
    const productsLink = screen.getByText('Products').closest('a');
    const contactLink = screen.getByText('Contact').closest('a');
    
    expect(homeLink?.getAttribute('href')).toBe('/');
    expect(productsLink?.getAttribute('href')).toBe('/products');
    expect(contactLink?.getAttribute('href')).toBe('/contact');
  });
});
