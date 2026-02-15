import Link from 'next/link';

export function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">
            GreenTech Solutions
          </h1>
          <p className="text-2xl mb-8 text-blue-100">
            Powering Tomorrow with Renewable Energy
          </p>
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg text-blue-50 leading-relaxed">
              We specialize in providing high-quality renewable energy products including solar panels, 
              inverters, and battery storage solutions. Our mission is to make clean energy accessible 
              and affordable for homes and businesses.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-block bg-white text-blue-700 font-semibold px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Browse Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}
