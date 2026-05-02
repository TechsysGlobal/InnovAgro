import { useState, useEffect } from 'react';

export default function Products({ onAddCart }) {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('all');

  useEffect(() => {
    fetch('/products.json')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      });
  }, []);

  useEffect(() => {
    let result = products;
    if (brand !== 'all') result = result.filter(p => p.brand.toLowerCase() === brand);
    if (search) result = result.filter(p => p.product_name.toLowerCase().includes(search.toLowerCase()));
    setFiltered(result);
  }, [search, brand, products]);

  return (
    <main className="flex-grow">
      {/* Hero */}
      <section className="relative bg-surface-container-lowest w-full overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-gutter py-stack-xl flex flex-col lg:flex-row items-center gap-stack-lg">
          <div className="lg:w-1/2 flex flex-col gap-stack-md z-10">
            <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">📱 All Products</span>
            <h1 className="font-h1 text-h1 text-on-surface">Explore Our Collection</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg">
              Discover our premium selection of Apple and Samsung smartphones with authentic warranty and expert support.
            </p>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-[#0071bd]/5 rounded-full blur-3xl -z-10 transform translate-x-10 translate-y-10"></div>
            <img
              alt="Smartphones Collection"
              className="w-full h-auto object-cover rounded-xl shadow-lg border border-outline-variant/30"
              src="public\phones.jpg"
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-surface py-stack-xl">
        <div className="max-w-[1280px] mx-auto px-gutter">
          <div className="flex justify-between items-end mb-stack-lg border-b border-outline-variant/30 pb-stack-sm">
            <h2 className="font-h2 text-h2 text-on-surface">All Products <span className="text-on-surface-variant text-xl">({filtered.length})</span></h2>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-stack-lg">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-[#F8FAFC] border border-outline-variant/50 rounded-full py-2 px-4 focus:outline-none focus:border-[#0071bd] transition-colors"
            />
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="bg-[#F8FAFC] border border-outline-variant/50 rounded-full py-2 px-4 focus:outline-none focus:border-[#0071bd] transition-colors cursor-pointer"
            >
              <option value="all">All Brands</option>
              <option value="apple">Apple</option>
              <option value="samsung">Samsung</option>
            </select>
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
              {filtered.map((product) => (
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
          ) : (
            <div className="text-center py-20 text-on-surface-variant">
              <span className="material-symbols-outlined text-6xl mb-4 block">search_off</span>
              <p className="font-body-lg">No products found</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
