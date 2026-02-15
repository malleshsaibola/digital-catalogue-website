// TypeScript types for the Digital Catalogue Website

export interface Product {
  id: string;
  name: string;
  description: string;
  specifications: Record<string, string>;
  image: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}
