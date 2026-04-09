import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { clearTokens, getAccessToken } from '../utils/auth.js';

function Navbar() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const isLoggedIn = !!getAccessToken();

  const handleLogout = () => {
    clearTokens();
    navigate('/login');
  };

  return (
    <nav className='sticky top-0 z-50 bg-white/80 backdrop-blur border-b'>
      <div className='max-w-7xl mx-auto px-6 h-16 flex items-center justify-between'>
        {/* LOGO */}
        <Link
          to='/'
          className='text-xl cursor-pointer font-bold text-gray-800 hover:opacity-80 transition'
        >
          🛍️ DjangoCart
        </Link>

        {/* RIGHT SIDE */}
        <div className='flex items-center gap-6'>
          {/* AUTH */}
          {!isLoggedIn ? (
            <>
              <Link
                to='/login'
                className='text-gray-700 hover:text-black transition'
              >
                Login
              </Link>
              <Link
                to='/signup'
                className='bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition'
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className='text-gray-700 hover:text-black transition'
            >
              Logout
            </button>
          )}

          {/* CART */}
          <Link
            to='/cart'
            className='relative flex items-center gap-2 text-gray-700 hover:text-black transition'
          >
            <span className='text-lg'>🛒</span>
            <span className='hidden sm:inline'>Cart</span>

            {cartCount > 0 && (
              <span className='absolute -top-2 -right-3 bg-black text-white text-xs font-semibold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1'>
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
