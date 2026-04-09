import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [added, setAdded] = useState(false);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASEURL}/api/products/${id}/`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, BASEURL]);

  const handleAddToCart = () => {
    if (!localStorage.getItem('access_token')) {
      navigate('/login');
      return;
    }

    addToCart(product.id);
    setAdded(true);

    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-6 py-10'>
        {/* BACK */}
        <Link
          to='/'
          className='text-sm text-gray-500 hover:underline mb-6 inline-block'
        >
          ← Back to products
        </Link>

        {/* LOADING */}
        {loading && (
          <div className='grid md:grid-cols-2 gap-10'>
            <div className='h-96 bg-gray-200 rounded-xl animate-pulse' />
            <div className='space-y-4'>
              <div className='h-8 bg-gray-200 rounded w-1/2 animate-pulse' />
              <div className='h-4 bg-gray-200 rounded w-full animate-pulse' />
              <div className='h-4 bg-gray-200 rounded w-3/4 animate-pulse' />
              <div className='h-10 bg-gray-200 rounded w-1/3 animate-pulse' />
            </div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl'>
            <p className='font-semibold'>Error</p>
            <p className='text-sm'>{error}</p>
          </div>
        )}

        {/* CONTENT */}
        {!loading && !error && product && (
          <div className='grid md:grid-cols-2 gap-12'>
            {/* IMAGE */}
            <div className='bg-white rounded-xl p-6 shadow-sm border sticky top-24 h-fit'>
              <img
                src={product.image}
                alt={product.name}
                className='w-full h-96 object-contain'
              />
            </div>

            {/* DETAILS */}
            <div>
              <h1 className='text-3xl font-bold text-gray-800 mb-3'>
                {product.name}
              </h1>

              <p className='text-gray-600 mb-6 leading-relaxed'>
                {product.description}
              </p>

              <p className='text-3xl font-semibold text-black mb-6'>
                ${product.price}
              </p>

              {/* CTA */}
              <button
                onClick={handleAddToCart}
                className='w-full cursor-pointer sm:w-auto bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition'
              >
                {added ? '✔ Added!' : 'Add to Cart'}
              </button>

              {/* EXTRA */}
              <div className='mt-8 text-sm text-gray-500 space-y-2'>
                <p>🚚 Free delivery</p>
                <p>↩️ 14-day return policy</p>
                <p>🔒 Secure checkout</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
