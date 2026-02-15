import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ContactForm } from '@/components/ContactForm';

describe('ContactForm Component', () => {
  it('should render all form fields', () => {
    render(<ContactForm />);
    
    expect(screen.getByLabelText('Name')).toBeDefined();
    expect(screen.getByLabelText('Email')).toBeDefined();
    expect(screen.getByLabelText('Message')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Send Message' })).toBeDefined();
  });

  it('should display validation error when name is empty', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeDefined();
    });
  });

  it('should display validation error when email is empty', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeDefined();
    });
  });

  it('should display validation error when email is invalid', async () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeDefined();
    });
  });

  it('should display validation error when message is empty', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Message is required')).toBeDefined();
    });
  });

  it('should display all validation errors when all fields are empty', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeDefined();
      expect(screen.getByText('Email is required')).toBeDefined();
      expect(screen.getByText('Message is required')).toBeDefined();
    });
  });

  it('should clear error when user starts typing in a field', async () => {
    render(<ContactForm />);
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeDefined();
    });
    
    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'John' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Name is required')).toBeNull();
    });
  });

  it('should display success message on valid form submission', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, I have a question.' } });
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText("Thank you for your message! We'll get back to you soon.")).toBeDefined();
    });
    
    expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
      name: 'John Doe',
      email: 'john@example.com',
      message: 'Hello, I have a question.',
    });
    
    consoleSpy.mockRestore();
  });

  it('should reset form fields after successful submission', async () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText('Name') as HTMLInputElement;
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;
    const messageInput = screen.getByLabelText('Message') as HTMLTextAreaElement;
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, I have a question.' } });
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(nameInput.value).toBe('');
      expect(emailInput.value).toBe('');
      expect(messageInput.value).toBe('');
    });
  });

  it('should accept valid email formats', async () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');
    
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Test message' } });
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText("Thank you for your message! We'll get back to you soon.")).toBeDefined();
    });
  });

  it('should not submit form with only whitespace in fields', async () => {
    render(<ContactForm />);
    
    const nameInput = screen.getByLabelText('Name');
    const emailInput = screen.getByLabelText('Email');
    const messageInput = screen.getByLabelText('Message');
    
    fireEvent.change(nameInput, { target: { value: '   ' } });
    fireEvent.change(emailInput, { target: { value: '   ' } });
    fireEvent.change(messageInput, { target: { value: '   ' } });
    
    const submitButton = screen.getByRole('button', { name: 'Send Message' });
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeDefined();
      expect(screen.getByText('Email is required')).toBeDefined();
      expect(screen.getByText('Message is required')).toBeDefined();
    });
  });
});
