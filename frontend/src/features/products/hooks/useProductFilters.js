import { useState, useMemo } from 'react';

/**
 * Custom hook for managing product filters, search, and sorting.
 */
export function useProductFilters(allProducts, productsPerPage) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ 
    family: 'All', 
    category: 'All', 
    brand: 'All' 
  });
  const [sortBy, setSortBy] = useState('default');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    let result = allProducts.filter(p =>
      (filters.family === 'All' || p.family === filters.family) &&
      (filters.category === 'All' || p.category === filters.category) &&
      (filters.brand === 'All' || p.brand === filters.brand) &&
      (searchTerm === '' || 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => a.price - b.price); break;
      case 'price-high': result.sort((a, b) => b.price - a.price); break;
      case 'rating': result.sort((a, b) => b.rating - a.rating); break;
      case 'name': result.sort((a, b) => a.name.localeCompare(b.name)); break;
      default: break;
    }
    return result;
  }, [filters, searchTerm, sortBy, allProducts]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productsPerPage;
    return filteredProducts.slice(start, start + productsPerPage);
  }, [filteredProducts, currentPage, productsPerPage]);

  const resetFilters = () => {
    setFilters({ family: 'All', category: 'All', brand: 'All' });
    setSearchTerm('');
    setSortBy('default');
    setCurrentPage(1);
  };

  const activeCount = Object.values(filters).filter(v => v !== 'All').length + (searchTerm ? 1 : 0);

  return {
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
  };
}
