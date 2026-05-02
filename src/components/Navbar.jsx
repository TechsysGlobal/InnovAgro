import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ cartCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-[#F1F5F9] sticky top-0 z-50 border-b border-slate-200 shadow-sm">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.svg" alt="Innov Agro Logo" className="h-10 w-auto" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          <Link to="/" className="text-slate-600 font-medium hover:text-[#0071bd] transition-colors duration-200 font-['Space_Grotesk'] text-base tracking-tight">
            Home
          </Link>
          <Link to="/products" className="text-slate-600 font-medium hover:text-[#0071bd] transition-colors duration-200 font-['Space_Grotesk'] text-base tracking-tight">
            Products
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <input
              className="bg-[#F8FAFC] border-b-2 border-transparent focus:border-primary focus:ring-0 focus:outline-none rounded text-sm py-2 pl-3 pr-10 w-48 transition-colors"
              placeholder="Search phones..."
              type="text"
            />
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          </div>
          <button className="text-[#0071bd] hover:text-blue-800 transition-colors relative">
            <span className="material-symbols-outlined">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="text-[#0071bd] hover:text-blue-800 transition-colors">
            <span className="material-symbols-outlined">person</span>
          </button>
          {/* Mobile toggle */}
          <button className="md:hidden text-[#0071bd]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 border-t border-slate-200">
          <Link to="/" className="text-slate-600 font-medium hover:text-[#0071bd] py-2" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/products" className="text-slate-600 font-medium hover:text-[#0071bd] py-2" onClick={() => setMobileMenuOpen(false)}>
            Products
          </Link>
          <input className="bg-[#F8FAFC] border rounded py-2 px-3 text-sm" placeholder="Search phones..." type="text" />
        </div>
      )}
    </header>
  );
}
