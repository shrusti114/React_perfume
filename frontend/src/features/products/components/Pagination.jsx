import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (p) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    const max = 7;
    let start = Math.max(1, currentPage - 3);
    let end = Math.min(totalPages, start + max - 1);
    
    if (end - start < max - 1) start = Math.max(1, end - max + 1);
    
    if (start > 1) { 
      pages.push(1); 
      if (start > 2) pages.push('...'); 
    }
    
    for (let i = start; i <= end; i++) pages.push(i);
    
    if (end < totalPages) { 
      if (end < totalPages - 1) pages.push('...'); 
      pages.push(totalPages); 
    }
    
    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-1.5 mt-10">
      <button
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-white/10 disabled:opacity-30 transition-all shadow-sm"
      >
        <ChevronLeft size={14} />
      </button>

      {getPageNumbers().map((p, idx) =>
        p === '...' ? (
          <span key={`e-${idx}`} className="w-7 text-center text-neutral-400 text-xs">…</span>
        ) : (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`w-8 h-8 rounded-full text-[10px] font-bold transition-all ${
              currentPage === p
                ? 'bg-black text-white dark:bg-[#f8c8dc] dark:text-black shadow-md'
                : 'bg-neutral-100 dark:bg-white/5 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-white/10'
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-full bg-neutral-100 dark:bg-white/5 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-white/10 disabled:opacity-30 transition-all shadow-sm"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
};

export default Pagination;
