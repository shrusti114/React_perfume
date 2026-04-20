import React, { useMemo } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { SlidersHorizontal, Search } from 'lucide-react';
import Breadcrumb from '../components/common/navigation/Breadcrumb';
import PageBanner from '../features/products/components/PageBanner';
import ProductCard from '../features/products/components/ProductCard';
import ShopSidebar from '../features/products/components/ShopSidebar';
import Pagination from '../features/products/components/Pagination';
import { useProducts, useAddToCart } from '../hooks/useApi';
import { useProductFilters } from '../features/products/hooks/useProductFilters';

const PRODUCTS_PER_PAGE = 20;

const Shop = () => {
  const { data: apiProducts, isLoading } = useProducts();
  const products = apiProducts || [];

  const allBrands = useMemo(() => {
    return [...new Set(products.map(p => p.brand))].sort();
  }, [products]);

  const {
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    filteredProducts,
    paginatedProducts,
    totalPages,
    resetFilters,
    activeCount
  } = useProductFilters(products, PRODUCTS_PER_PAGE);

  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [brandSearch, setBrandSearch] = React.useState('');

  const filteredBrands = useMemo(() => {
    if (!brandSearch) return allBrands.slice(0, 50);
    return allBrands.filter(b => b.toLowerCase().includes(brandSearch.toLowerCase())).slice(0, 50);
  }, [brandSearch, allBrands]);

  const { mutate: addToCart } = useAddToCart();
  const handleAddToCart = (id) => addToCart({ productId: id, quantity: 1 });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-black">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#f8c8dc] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs uppercase tracking-widest font-bold text-neutral-400">Loading perfumes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen font-sans text-neutral-800 dark:text-neutral-200 transition-colors duration-300">
      <PageBanner 
        title="Perfume Boutique" 
        subtitle={`${filteredProducts.length} perfumes from ${allBrands.length} luxury brands`} 
      />

      <div className="max-w-[1440px] mx-auto px-4 md:px-6 py-6 pt-12">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Shop', path: '/shop' },
          ...(filters.family !== 'All' ? [{ label: filters.family, path: '#' }] : []),
          ...(filters.brand !== 'All' ? [{ label: filters.brand, path: '#' }] : []),
        ]} />

        <div className="flex gap-6 mt-6">
          <ShopSidebar 
            sidebarOpen={sidebarOpen}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            activeCount={activeCount}
            families={['All', 'Floral', 'Woody', 'Fresh', 'Oriental', 'Luxury Collection']}
            categories={['All', 'For Men', 'For Women', 'Unisex']}
            allBrands={allBrands}
            brandSearch={brandSearch}
            setBrandSearch={setBrandSearch}
            filteredBrands={filteredBrands}
            sortBy={sortBy}
            setSortBy={setSortBy}
            setCurrentPage={setCurrentPage}
          />

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

            <div className="flex justify-between items-center mb-6 py-2 border-b border-black/5 dark:border-white/5">
              <p className="text-[10px] text-neutral-400 uppercase tracking-widest font-bold">
                {filteredProducts.length} perfumes · Page {currentPage}/{totalPages || 1}
              </p>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:flex items-center gap-1 text-[10px] uppercase tracking-widest font-bold text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
              >
                <SlidersHorizontal size={12} /> {sidebarOpen ? 'Hide' : 'Show'} Filters
              </button>
            </div>

            <div className={`grid gap-6 ${sidebarOpen ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}`}>
              {paginatedProducts.map((product) => (
                <ProductCard 
                  key={product._id} 
                  product={product} 
                  onAdd={handleAddToCart} 
                  compact={true}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24">
                <p className="text-5xl mb-4 opacity-50">🔮</p>
                <h3 className="text-2xl font-serif text-black dark:text-white mb-2">No perfumes found</h3>
                <p className="text-neutral-500 text-sm font-light mb-8">Try adjusting your filters or search terms.</p>
                <button onClick={resetFilters} className="px-8 py-3 rounded-full bg-black text-white dark:bg-[#f8c8dc] dark:text-black text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-transform">
                  Reset All Filters
                </button>
              </div>
            )}

            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              setCurrentPage={setCurrentPage} 
            />

            <p className="text-center text-[9px] text-neutral-400 mt-6 uppercase tracking-[0.2em] font-bold">
              Showing {((currentPage - 1) * PRODUCTS_PER_PAGE) + 1}–{Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)} of {filteredProducts.length} perfumes
            </p>
          </main>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/shop')({
  component: Shop,
});
