import { getAllProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
        <p className="text-lg text-gray-600 mb-8">
          Explore our range of high-quality renewable energy solutions
        </p>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
