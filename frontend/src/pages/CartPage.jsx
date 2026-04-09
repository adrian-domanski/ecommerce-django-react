import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
  const { cartItems, total, removeFromCart, updateQuantity } = useCart();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-6 py-10'>
        {/* HEADER */}
        <h1 className='text-3xl font-bold text-gray-800 mb-8'>🛒 Your Cart</h1>

        {/* EMPTY STATE */}
        {cartItems.length === 0 ? (
          <div className='text-center py-20'>
            <p className='text-xl text-gray-500'>Your cart is empty 🥲</p>
            <Link
              to='/'
              className='inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition'
            >
              Go Shopping
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* LEFT - PRODUCTS */}
            <div className='lg:col-span-2 space-y-4'>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className='flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border hover:shadow-md transition'
                >
                  {/* IMAGE */}
                  {item.product_image && (
                    <img
                      src={`${BASEURL}${item.product_image}`}
                      alt={item.product_name}
                      className='w-20 h-20 object-cover rounded-lg'
                    />
                  )}

                  {/* INFO */}
                  <div className='flex-1'>
                    <h2 className='font-semibold text-gray-800'>
                      {item.product_name}
                    </h2>
                    <p className='text-gray-500 text-sm'>
                      ${item.product_price}
                    </p>
                  </div>

                  {/* QUANTITY */}
                  <div className='flex items-center gap-2'>
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className='w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100 disabled:opacity-30'
                    >
                      −
                    </button>

                    <span className='w-6 text-center'>{item.quantity}</span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className='w-8 h-8 flex items-center justify-center rounded border hover:bg-gray-100'
                    >
                      +
                    </button>
                  </div>

                  {/* PRICE */}
                  <div className='w-20 text-right font-semibold'>
                    ${(item.product_price * item.quantity).toFixed(2)}
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className='text-gray-400 hover:text-red-500 transition'
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* RIGHT - SUMMARY */}
            <div className='bg-white p-6 rounded-xl shadow-sm border h-fit sticky top-24'>
              <h2 className='text-lg font-semibold mb-4'>Order Summary</h2>

              <div className='flex justify-between mb-2 text-gray-600'>
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <div className='flex justify-between mb-4 text-gray-600'>
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className='border-t pt-4 flex justify-between font-bold text-lg'>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Link
                to='/checkout'
                className='block mt-6 w-full text-center bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition'
              >
                Checkout
              </Link>

              <Link
                to='/'
                className='block mt-3 text-center text-sm text-gray-500 hover:underline'
              >
                Continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
