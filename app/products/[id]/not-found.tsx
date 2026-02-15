import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            Sorry, we couldn&apos;t find the product you&apos;re looking for.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/products"
            className="block w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            View All Products
          </Link>
          
          <Link
            href="/"
            className="block w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
