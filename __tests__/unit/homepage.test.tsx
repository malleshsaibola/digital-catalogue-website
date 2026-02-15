import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Hero } from '@/components/Hero';

describe('Hero Component', () => {
  it('should display company name', () => {
    render(<Hero />);
    expect(screen.getByText('GreenTech Solutions')).toBeDefined();
  });

  it('should display tagline', () => {
    render(<Hero />);
    expect(screen.getByText('Powering Tomorrow with Renewable Energy')).toBeDefined();
  });

  it('should display company description', () => {
    render(<Hero />);
    const description = screen.getByText(/We specialize in providing high-quality renewable energy products/);
    expect(description).toBeDefined();
  });

  it('should have call-to-action button linking to Products page', () => {
    render(<Hero />);
    const ctaButton = screen.getByText('Browse Our Products').closest('a');
    expect(ctaButton).toBeDefined();
    expect(ctaButton?.getAttribute('href')).toBe('/products');
  });

  it('should display all required hero elements', () => {
    render(<Hero />);
    
    // Requirement 2.1: Hero section with company name and tagline
    expect(screen.getByText('GreenTech Solutions')).toBeDefined();
    expect(screen.getByText('Powering Tomorrow with Renewable Energy')).toBeDefined();
    
    // Requirement 2.2: Company description
    expect(screen.getByText(/We specialize in providing high-quality renewable energy products/)).toBeDefined();
    
    // Requirement 2.3: Call-to-action button
    const ctaButton = screen.getByText('Browse Our Products').closest('a');
    expect(ctaButton?.getAttribute('href')).toBe('/products');
  });
});
