import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ContactPage from '@/app/contact/page';

describe('Contact Page', () => {
  it('should render the page title', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { name: 'Contact Us', level: 1 })).toBeDefined();
  });

  it('should display company email address', () => {
    render(<ContactPage />);
    const emailLink = screen.getByRole('link', { name: 'info@renewableenergy.com' });
    expect(emailLink).toBeDefined();
    expect(emailLink.getAttribute('href')).toBe('mailto:info@renewableenergy.com');
  });

  it('should display company phone number', () => {
    render(<ContactPage />);
    const phoneLink = screen.getByRole('link', { name: '+1 (234) 567-890' });
    expect(phoneLink).toBeDefined();
    expect(phoneLink.getAttribute('href')).toBe('tel:+1234567890');
  });

  it('should display business hours', () => {
    render(<ContactPage />);
    expect(screen.getByText('Business Hours')).toBeDefined();
    expect(screen.getByText('Monday - Friday: 9:00 AM - 6:00 PM')).toBeDefined();
    expect(screen.getByText('Saturday: 10:00 AM - 4:00 PM')).toBeDefined();
    expect(screen.getByText('Sunday: Closed')).toBeDefined();
  });

  it('should render the ContactForm component', () => {
    render(<ContactPage />);
    // Check for form elements that are part of ContactForm
    expect(screen.getByLabelText('Name')).toBeDefined();
    expect(screen.getByLabelText('Email')).toBeDefined();
    expect(screen.getByLabelText('Message')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeDefined();
  });

  it('should have proper section headings', () => {
    render(<ContactPage />);
    expect(screen.getByRole('heading', { name: 'Send us a message', level: 2 })).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Get in touch', level: 2 })).toBeDefined();
  });

  it('should display descriptive text for the form section', () => {
    render(<ContactPage />);
    expect(screen.getByText(/Have questions about our renewable energy products/)).toBeDefined();
  });

  it('should display descriptive text for the contact info section', () => {
    render(<ContactPage />);
    expect(screen.getByText(/You can also reach us directly/)).toBeDefined();
  });
});
