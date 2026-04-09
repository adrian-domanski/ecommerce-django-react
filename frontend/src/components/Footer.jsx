function Footer() {
  return (
    <footer className='bg-white border-t mt-16'>
      <div className='max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8'>
        {/* BRAND */}
        <div>
          <h2 className='text-lg font-bold text-gray-800'>🛍️ DjangoCart</h2>
          <p className='text-gray-500 text-sm mt-2'>
            Simple e-commerce app built with Django & React.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h3 className='font-semibold text-gray-700 mb-3'>Navigation</h3>
          <ul className='space-y-2 text-sm text-gray-500'>
            <li>
              <a href='/' className='hover:text-black transition'>
                Home
              </a>
            </li>
            <li>
              <a href='/cart' className='hover:text-black transition'>
                Cart
              </a>
            </li>
            <li>
              <a href='/login' className='hover:text-black transition'>
                Login
              </a>
            </li>
          </ul>
        </div>

        {/* INFO */}
        <div>
          <h3 className='font-semibold text-gray-700 mb-3'>Info</h3>
          <ul className='space-y-2 text-sm text-gray-500'>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM */}
      <div className='border-t text-center text-sm text-gray-400 py-4'>
        © {new Date().getFullYear()} DjangoCart. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
