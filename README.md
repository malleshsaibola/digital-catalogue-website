# Digital Catalogue Website

A simple, clean website for showcasing renewable energy products (solar panels, inverters, batteries).

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest + fast-check
- **Data Storage**: Static JSON file

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/                 # Next.js app directory
├── page.tsx        # Homepage
├── layout.tsx      # Root layout
└── globals.css     # Global styles

components/          # React components
lib/                # Utilities and types
├── types.ts        # TypeScript type definitions
data/               # Static data files
```

## Testing

Run tests with:
```bash
npm test
```

## Build

Build for production:
```bash
npm run build
```
