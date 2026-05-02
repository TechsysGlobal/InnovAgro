import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home({ onAddCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 6)));
  }, []);

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative bg-surface-container-lowest w-full overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-gutter py-stack-xl flex flex-col lg:flex-row items-center gap-stack-lg">
          <div className="lg:w-1/2 flex flex-col gap-stack-md z-10">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">🚀 Latest Release</span>
            <h1 className="font-h1 text-h1 text-on-surface">Next-Gen Mobile Technology</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Experience unparalleled performance with cutting-edge processors, revolutionary camera systems, and stunning displays.
            </p>
            <div className="flex gap-stack-sm mt-stack-sm">
              <Link to="/products" className="bg-[#0071bd] text-white rounded-full px-6 py-3 font-body-md hover:bg-blue-800 transition-colors shadow-sm flex items-center gap-2">
                Shop Premium Phones
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link to="/products" className="bg-transparent border-2 border-[#0071bd] text-[#0071bd] rounded-full px-6 py-3 font-body-md hover:bg-blue-50 transition-colors">
                View All Products
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[#0071bd]/5 rounded-full blur-3xl -z-10 transform translate-x-10 translate-y-10"></div>
            <img
              alt="Latest Smartphone"
              className="w-full h-auto object-cover rounded-xl shadow-lg border border-outline-variant/30"
              src="public\phones.jpg"
            />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-surface py-stack-xl">
        <div className="max-w-[1280px] mx-auto px-gutter">
          <div className="flex justify-between items-end mb-stack-lg border-b border-outline-variant/30 pb-stack-sm">
            <h2 className="font-h2 text-h2 text-on-surface">Featured Smartphones</h2>
            <Link to="/products" className="font-body-md text-[#0071bd] hover:text-blue-800 flex items-center gap-1 transition-colors">
              View All <span className="material-symbols-outlined text-sm">chevron_right</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
            {products.map((product) => (
              <div key={product.product_name} className="bg-surface-container-lowest rounded group border border-outline-variant/30 hover:shadow-[0_4px_24px_rgba(0,113,189,0.08)] transition-all duration-300 flex flex-col">
                <div className="relative p-6 flex-grow flex items-center justify-center bg-surface-container-lowest rounded-t min-h-[220px]">
                  <span className="absolute top-4 left-4 bg-[#0071bd]/10 text-[#0071bd] font-label-caps text-label-caps px-3 py-1 rounded-full">
                    {product.brand}
                  </span>
                  <img
                    alt={product.product_name}
                    className="w-full max-w-[200px] h-[180px] object-contain mix-blend-multiply"
                    src={product.image}
                  />
                </div>
                <div className="p-6 border-t border-outline-variant/30 bg-[#F8FAFC]">
                  <h3 className="font-h3 text-h3 text-on-surface mb-1">{product.product_name}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mb-stack-md">{product.category}</p>
                  <button
                    onClick={() => onAddCart({ name: product.product_name })}
                    className="w-full bg-transparent border border-[#0071bd] text-[#0071bd] hover:bg-[#0071bd] hover:text-white rounded-full py-2 font-body-md transition-colors flex justify-center items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="bg-surface-container-lowest py-stack-xl border-y border-outline-variant/30">
        <div className="max-w-[1280px] mx-auto px-gutter">
          <div className="text-center mb-stack-lg max-w-2xl mx-auto">
            <h2 className="font-h2 text-h2 text-on-surface mb-stack-sm">Why Choose Innov Agro</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">We deliver premium devices with exceptional service, authentic warranty, and expert support you can trust.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-stack-lg">
            {[
              { icon: 'local_shipping', title: 'Fast Shipping', desc: 'Free expedited shipping on all orders. Express delivery available in 24-48 hours.' },
              { icon: 'support_agent', title: 'Expert Support', desc: '24/7 technical assistance from certified device specialists ready to help anytime.' },
              { icon: 'verified', title: 'Authentic 100%', desc: 'Guaranteed genuine products with official 2-year warranty from manufacturers.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center text-center p-6 bg-[#F8FAFC] rounded-xl border border-outline-variant/20 hover:border-[#0071bd]/30 transition-colors">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-stack-md text-[#0071bd]">
                  <span className="material-symbols-outlined text-[32px]">{icon}</span>
                </div>
                <h3 className="font-h3 text-h3 text-on-surface mb-stack-xs">{title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-surface py-stack-xl">
        <div className="max-w-3xl mx-auto px-gutter text-center">
          <div className="bg-gradient-to-r from-[#0071bd]/5 to-blue-50 p-stack-lg rounded-xl shadow-sm border border-[#0071bd]/20 flex flex-col items-center">
            <span className="material-symbols-outlined text-[#0071bd] text-4xl mb-stack-sm">mail</span>
            <h2 className="font-h2 text-h2 text-on-surface mb-stack-xs">Stay Updated on Latest Deals</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-stack-md">Subscribe to get exclusive offers, early access to new releases, and smartphone tips delivered to your inbox.</p>
            <form className="w-full max-w-md flex flex-col sm:flex-row gap-stack-xs" onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing!'); e.target.reset(); }}>
              <input className="flex-grow bg-[#F8FAFC] border-b-2 border-transparent focus:border-[#0071bd] focus:outline-none rounded py-3 px-4 transition-colors" placeholder="Enter your email" type="email" required />
              <button className="bg-[#0071bd] text-white rounded-full px-6 py-3 font-body-md hover:bg-blue-800 transition-colors whitespace-nowrap shadow-sm" type="submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
