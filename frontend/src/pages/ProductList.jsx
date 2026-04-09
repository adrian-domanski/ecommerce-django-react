import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard.jsx';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${BASEURL}/api/products/`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className=' bg-gray-50'>
      {/* HEADER */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-7xl mx-auto px-6 py-6'>
          <h1 className='text-3xl font-bold text-gray-800'>Product List</h1>
          <p className='text-gray-500 mt-1'>Browse available products</p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6 py-8'>
        {/* LOADING */}
        {loading && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className='h-60 bg-gray-200 rounded-xl animate-pulse'
              />
            ))}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center'>
            <p className='font-semibold'>Something went wrong</p>
            <p className='text-sm'>{error}</p>
          </div>
        )}

        {/* CONTENT */}
        {!loading && !error && (
          <>
            {products.length > 0 ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {products.map((product) => (
                  <div
                    key={product.id}
                    className='transform transition duration-200 hover:scale-[1.02]'
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className='text-center py-20'>
                <p className='text-gray-400 text-lg'>
                  No products available 😕
                </p>
                <p className='text-sm text-gray-500 mt-2'>
                  Try adding some products in the backend
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;
