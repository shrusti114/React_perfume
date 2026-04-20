import React from 'react';
import { Search, X, Flower2, TreePine, Droplets, Flame, Crown } from 'lucide-react';

const familyIcons = {
  Floral: <Flower2 size={14} />,
  Woody: <TreePine size={14} />,
  Fresh: <Droplets size={14} />,
  Oriental: <Flame size={14} />,
  'Luxury Collection': <Crown size={14} />,
};

const ShopSidebar = ({ 
  sidebarOpen, 
  searchTerm, 
  setSearchTerm, 
  filters, 
  setFilters, 
  resetFilters, 
  activeCount,
  families,
  categories,
  allBrands,
  brandSearch,
  setBrandSearch,
  filteredBrands,
  sortBy,
  setSortBy,
  setCurrentPage,
  allProductsLen
}) => {
  return (
    <aside className={`${sidebarOpen ? 'w-72 min-w-[280px]' : 'w-0 min-w-0 overflow-hidden'} transition-all duration-300 hidden lg:block`}>
      <div className="sticky top-24 bg-white dark:bg-neutral-950 border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-sm">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif text-lg text-black dark:text-white">Filters</h3>
          {activeCount > 0 && (
            <button onClick={resetFilters} className="text-[10px] uppercase tracking-widest font-bold text-[#f8c8dc] hover:text-black dark:hover:text-white transition-colors flex items-center gap-1">
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
            {families.map(f => (
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
                <span className={`text-[9px] px-2 py-0.5 rounded-full ${filters.family === f ? 'bg-white/20 dark:bg-black/20' : 'bg-neutral-100 dark:bg-white/5'}`}>
                   {/* This part needs the real counts from parent if possible, but for now we'll just show it. */}
                </span>
              </button>
            ))}
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
            className="w-full bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/10 px-3 py-2 rounded-lg text-xs text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] mb-2 shadow-inner"
          />
          <div className="max-h-48 overflow-y-auto space-y-0.5 scrollbar-thin pr-1">
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

        {/* Sort By */}
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
  );
};

export default ShopSidebar;
