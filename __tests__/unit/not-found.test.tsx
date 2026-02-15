import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

describe('NotFound Page', () => {
  it('should render 404 heading', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeDefined();
  });

  it('should render page not found message', () => {
    render(<NotFound />);
    expect(screen.getByText('Page Not Found')).toBeDefined();
  });

  it('should render descriptive error message', () => {
    render(<NotFound />);
    expect(screen.getByText(/Sorry, we couldn't find the page you're looking for/i)).toBeDefined();
  });

  it('should render link to homepage', () => {
    render(<NotFound />);
    const homeLink = screen.getByRole('link', { name: /go to homepage/i });
    expect(homeLink).toBeDefined();
    expect(homeLink.getAttribute('href')).toBe('/');
  });

  it('should render link to products page', () => {
    render(<NotFound />);
    const productsLink = screen.getByRole('link', { name: /browse products/i });
    expect(productsLink).toBeDefined();
    expect(productsLink.getAttribute('href')).toBe('/products');
  });
});
