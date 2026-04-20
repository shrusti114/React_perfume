import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export function CategoryList({ categories }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((cat, idx) => (
        <motion.div 
          key={cat.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
        >
          <Link to="/shop" className="group relative h-64 rounded-2xl overflow-hidden block">
            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 dark:opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-5">
              <h3 className="text-xl font-serif text-white mb-0.5">{cat.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-[#f8c8dc] text-[10px] font-bold uppercase tracking-widest">{cat.description || cat.count}</span>
                <ArrowRight size={14} className="text-white group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
