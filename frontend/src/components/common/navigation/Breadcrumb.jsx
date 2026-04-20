import React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-8 overflow-x-auto whitespace-nowrap">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={index} className="flex items-center">
            {isLast ? (
              <span className="text-black dark:text-[#f8c8dc]">{item.label}</span>
            ) : (
              <>
                <Link to={item.path} className="hover:text-black dark:hover:text-white transition-colors">
                  {item.label}
                </Link>
                <ChevronRight size={14} className="mx-2 text-neutral-300 dark:text-neutral-600" />
              </>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
