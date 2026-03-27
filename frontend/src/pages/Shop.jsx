import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, ShoppingBag, Heart, Eye, Star, X,
  ChevronLeft, ChevronRight, SlidersHorizontal,
  Flower2, TreePine, Droplets, Flame, Crown,
} from 'lucide-react';
import Breadcrumb from '../components/common/Breadcrumb';
import { allProducts, brands as allBrands } from '../data/perfumeData';

const PRODUCTS_PER_PAGE = 20;

const familyIcons = {
  Floral: <Flower2 size={14} />,
  Woody: <TreePine size={14} />,
  Fresh: <Droplets size={14} />,
  Oriental: <Flame size={14} />,
  'Luxury Collection': <Crown size={14} />,
};

const Shop = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ family: 'All', category: 'All', brand: 'All' });
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [brandSearch, setBrandSearch] = useState('');
  const [sortBy, setSortBy] = useState('default');

  const families = ['All', 'Floral', 'Woody', 'Fresh', 'Oriental', 'Luxury Collection'];
  const categories = ['All', 'For Men', 'For Women', 'Unisex'];

  const filteredBrands = useMemo(() => {
    if (!brandSearch) return allBrands.slice(0, 50);
    return allBrands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase())).slice(0, 50);
  }, [brandSearch]);

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter(p =>
      (filters.family === 'All' || p.family === filters.family) &&
      (filters.category === 'All' || p.category === filters.category) &&
      (filters.brand === 'All' || p.brand === filters.brand) &&
      (searchTerm === '' || p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return result;
  }, [filters, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

  const resetFilters = () => {
    setFilters({ family: 'All', category: 'All', brand: 'All' });
    setSearchTerm('');
    setSortBy('default');
    setCurrentPage(1);
  };

  const activeCount = Object.values(filters).filter(v => v !== 'All').length + (searchTerm ? 1 : 0);

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen font-sans text-neutral-800 dark:text-neutral-200 transition-colors duration-300">

      {/* ── Top Banner ─────────────── */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2000" alt="Shop Perfumes" className="w-full h-full object-cover opacity-40 dark:opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 dark:from-black to-transparent" />
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-2">Perfume Boutique</h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm font-light">{filteredProducts.length.toLocaleString()} perfumes from {allBrands.length} brands</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Shop', path: '/shop' },
          ...(filters.family !== 'All' ? [{ label: filters.family, path: '#' }] : []),
          ...(filters.brand !== 'All' ? [{ label: filters.brand, path: '#' }] : []),
        ]} />

        <div className="flex gap-6 mt-6">
          {/* ── SIDEBAR FILTERS ───────── */}
          <aside className={`${sidebarOpen ? 'w-72 min-w-[280px]' : 'w-0 min-w-0 overflow-hidden'} transition-all duration-300 hidden lg:block`}>
            <div className="sticky top-24 bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-sm">

              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-serif text-lg text-black dark:text-white">Filters</h3>
                {activeCount > 0 && (
                  <button onClick={resetFilters} className="text-[10px] uppercase tracking-widest font-bold text-[#f8c8dc] hover:text-white transition-colors flex items-center gap-1">
                    <X size={12} /> Clear All
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search perfumes..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/10 pl-9 pr-3 py-2.5 rounded-xl text-sm text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] transition-colors"
                />
              </div>

              {/* Fragrance Family */}
              <div className="mb-6">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#d4af37] dark:text-[#f8c8dc] mb-3">Fragrance Family</h4>
                <div className="space-y-1">
                  {families.map(f => {
                    const count = f === 'All' ? allProducts.length : allProducts.filter(p => p.family === f).length;
                    return (
                      <button
                        key={f}
                        onClick={() => { setFilters({ ...filters, family: f }); setCurrentPage(1); }}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all ${
                          filters.family === f
                            ? 'bg-black text-white dark:bg-[#f8c8dc] dark:text-black font-bold shadow-md'
                            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {f !== 'All' && familyIcons[f]}
                          {f}
                        </span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full ${filters.family === f ? 'bg-white/20 dark:bg-black/20' : 'bg-neutral-100 dark:bg-white/5'}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Gender */}
              <div className="mb-6">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#d4af37] dark:text-[#f8c8dc] mb-3">Gender</h4>
                <div className="space-y-1">
                  {categories.map(c => (
                    <button
                      key={c}
                      onClick={() => { setFilters({ ...filters, category: c }); setCurrentPage(1); }}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all ${
                        filters.category === c
                          ? 'bg-black text-white dark:bg-[#f8c8dc] dark:text-black font-bold shadow-md'
                          : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-white/5'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#d4af37] dark:text-[#f8c8dc] mb-3">Brand ({allBrands.length})</h4>
                <input
                  type="text"
                  placeholder="Search brands..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/10 px-3 py-2 rounded-lg text-xs text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] mb-2"
                />
                <div className="max-h-48 overflow-y-auto space-y-0.5 scrollbar-thin">
                  <button
                    onClick={() => { setFilters({ ...filters, brand: 'All' }); setCurrentPage(1); }}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all ${
                      filters.brand === 'All' ? 'bg-black text-white dark:bg-[#f8c8dc] dark:text-black font-bold' : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/5'
                    }`}
                  >
                    All Brands
                  </button>
                  {filteredBrands.map(b => (
                    <button
                      key={b}
                      onClick={() => { setFilters({ ...filters, brand: b }); setCurrentPage(1); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-all truncate ${
                        filters.brand === b ? 'bg-black text-white dark:bg-[#f8c8dc] dark:text-black font-bold' : 'text-neutral-500 hover:bg-neutral-100 dark:hover:bg-white/5'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Sort */}
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#d4af37] dark:text-[#f8c8dc] mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/10 px-3 py-2.5 rounded-xl text-xs text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] cursor-pointer"
                >
                  <option value="default">Default</option>
                  <option value="price-low">Price: Low → High</option>
                  <option value="price-high">Price: High → Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="name">Name A–Z</option>
                </select>
              </div>
            </div>
          </aside>

          {/* ── MAIN CONTENT ──────────── */}
          <main className="flex-1 min-w-0">
            {/* Mobile Filter Bar */}
            <div className="lg:hidden flex items-center gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="w-full bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 pl-9 pr-3 py-2.5 rounded-xl text-sm text-black dark:text-white focus:outline-none focus:border-[#f8c8dc]"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 px-3 py-2.5 rounded-xl text-xs text-black dark:text-white"
              >
                <option value="default">Sort</option>
                <option value="price-low">Price ↑</option>
                <option value="price-high">Price ↓</option>
                <option value="rating">Rating</option>
              </select>
            </div>

            {/* Active Filters */}
            {activeCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">Active:</span>
                {filters.family !== 'All' && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f8c8dc]/10 dark:bg-[#f8c8dc]/5 text-[10px] font-bold text-[#d4af37] dark:text-[#f8c8dc]">
                    {familyIcons[filters.family]} {filters.family}
                    <button onClick={() => setFilters({ ...filters, family: 'All' })} className="ml-1 hover:text-red-400"><X size={10} /></button>
                  </span>
                )}
                {filters.category !== 'All' && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f8c8dc]/10 dark:bg-[#f8c8dc]/5 text-[10px] font-bold text-[#d4af37] dark:text-[#f8c8dc]">
                    {filters.category}
                    <button onClick={() => setFilters({ ...filters, category: 'All' })} className="ml-1 hover:text-red-400"><X size={10} /></button>
                  </span>
                )}
                {filters.brand !== 'All' && (
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#f8c8dc]/10 dark:bg-[#f8c8dc]/5 text-[10px] font-bold text-[#d4af37] dark:text-[#f8c8dc]">
                    {filters.brand}
                    <button onClick={() => setFilters({ ...filters, brand: 'All' })} className="ml-1 hover:text-red-400"><X size={10} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Results Count */}
            <div className="flex justify-between items-center mb-4">
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                {filteredProducts.length.toLocaleString()} perfumes · Page {currentPage}/{totalPages}
              </p>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <SlidersHorizontal size={12} /> {sidebarOpen ? 'Hide' : 'Show'} Filters
              </button>
            </div>

            {/* Product Grid */}
            <div className={`grid gap-4 ${sidebarOpen ? 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}`}>
              {paginatedProducts.map((product) => (
                <div key={product._id} className="group relative bg-white dark:bg-[#0a0a0a] rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-black/5 dark:border-white/5 transition-all duration-500 flex flex-col">

                  {product.badge && (
                    <span className="absolute top-3 left-3 z-20 bg-black text-white dark:bg-[#f8c8dc] dark:text-black text-[7px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shadow">{product.badge}</span>
                  )}

                  <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/90 dark:bg-black/80 p-1.5 rounded-full hover:bg-black hover:text-white dark:hover:bg-[#f8c8dc] dark:hover:text-black transition-all shadow"><Heart size={12} /></button>
                    <button className="bg-white/90 dark:bg-black/80 p-1.5 rounded-full hover:bg-black hover:text-white dark:hover:bg-[#f8c8dc] dark:hover:text-black transition-all shadow"><Eye size={12} /></button>
                  </div>

                  <Link to={`/product/${product._id}`} className="w-full h-56 overflow-hidden bg-neutral-100 dark:bg-[#111]">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </Link>

                  <div className="p-4 flex-grow flex flex-col">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-neutral-400 text-[8px] uppercase tracking-[0.15em] font-bold truncate">{product.brand}</span>
                      <div className="flex items-center gap-0.5">
                        <Star size={8} className="fill-[#d4af37] text-[#d4af37]" />
                        <span className="text-[9px] font-bold text-black dark:text-white">{product.rating}</span>
                      </div>
                    </div>
                    <span className="text-[7px] text-[#d4af37] dark:text-[#f8c8dc] uppercase tracking-widest font-bold mb-1">{product.family}</span>
                    <Link to={`/product/${product._id}`}>
                      <h3 className="text-sm font-serif text-black dark:text-white mb-1 group-hover:text-[#d4af37] dark:group-hover:text-[#f8c8dc] transition-colors leading-tight">{product.name}</h3>
                    </Link>
                    <p className="text-[10px] text-neutral-500 mb-3 font-light line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/5 dark:border-white/5">
                      <span className="text-sm font-bold text-black dark:text-white">${product.price}</span>
                      <button className="flex items-center gap-1 px-2.5 py-1 bg-black text-white dark:bg-white/10 dark:text-white hover:bg-neutral-800 dark:hover:bg-[#f8c8dc] dark:hover:text-black rounded-full transition-all text-[8px] font-bold uppercase tracking-widest">
                        <ShoppingBag size={10} /> Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-24">
                <p className="text-5xl mb-4">🔮</p>
                <h3 className="text-2xl font-serif text-black dark:text-white mb-2">No perfumes found</h3>
                <p className="text-neutral-500 text-sm font-light mb-6">Try adjusting your filters or search terms.</p>
                <button onClick={resetFilters} className="px-6 py-2.5 rounded-full bg-black text-white dark:bg-[#f8c8dc] dark:text-black text-xs font-bold uppercase tracking-widest">
                  Reset All Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1.5 mt-10">
                <button
                  onClick={() => { setCurrentPage(Math.max(1, currentPage - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-white/10 disabled:opacity-30 transition-all"
                >
                  <ChevronLeft size={14} />
                </button>

                {(() => {
                  const pages = [];
                  const max = 7;
                  let start = Math.max(1, currentPage - 3);
                  let end = Math.min(totalPages, start + max - 1);
                  if (end - start < max - 1) start = Math.max(1, end - max + 1);
                  if (start > 1) { pages.push(1); if (start > 2) pages.push('...'); }
                  for (let i = start; i <= end; i++) pages.push(i);
                  if (end < totalPages) { if (end < totalPages - 1) pages.push('...'); pages.push(totalPages); }
                  return pages.map((p, idx) =>
                    p === '...' ? (
                      <span key={`e-${idx}`} className="w-7 text-center text-neutral-400 text-xs">…</span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className={`w-8 h-8 rounded-full text-[10px] font-bold transition-all ${
                          currentPage === p
                            ? 'bg-black text-white dark:bg-[#f8c8dc] dark:text-black shadow-md'
                            : 'bg-neutral-100 dark:bg-white/5 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-white/10'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  );
                })()}

                <button
                  onClick={() => { setCurrentPage(Math.min(totalPages, currentPage + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-white/10 disabled:opacity-30 transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
            <p className="text-center text-[9px] text-neutral-400 mt-3 uppercase tracking-widest">
              Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}–{Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length.toLocaleString()} perfumes
            </p>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Shop;
