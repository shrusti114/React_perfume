import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = ({ productsCount, brandsCount }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2000"
          alt="Velvora Premium Perfume Light"
          className="w-full h-full object-cover object-center opacity-70 dark:hidden"
        />
        <img
          src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=2000"
          alt="Velvora Premium Perfume Dark"
          className="hidden dark:block w-full h-full object-cover object-center opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/60 to-transparent dark:from-black dark:via-black/60 dark:to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#f8c8dc]/20 dark:bg-[#f8c8dc]/8 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/10 dark:border-[#f8c8dc]/20 bg-black/5 dark:bg-white/5 backdrop-blur-md mb-8 text-neutral-800 dark:text-[#f8c8dc] text-[10px] font-bold uppercase tracking-[0.3em]"
        >
          <Star size={12} className="fill-current" /> {productsCount?.toLocaleString()} Perfumes · {brandsCount} Brands
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-[0.4em] mb-4"
        >
          Velvora Parfum House
        </motion.p>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-black dark:text-white mb-6 leading-[0.9] tracking-tight"
        >
          Sartorial<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-neutral-700 to-neutral-500 dark:from-white dark:via-[#f8c8dc] dark:to-neutral-400">Elegance</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-12 leading-relaxed font-light max-w-2xl mx-auto"
        >
          Discover the art of fine fragrance with our exclusive collection of luxury perfumes. Crafted with the finest ingredients, each scent is designed to capture elegance, confidence, and individuality. From bold oud blends to soft floral notes, our fragrances are made to leave a lasting impression wherever you go.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/shop"
            className="bg-black text-white dark:bg-[#f8c8dc] dark:text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 dark:hover:bg-white hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-[#f8c8dc]/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            Explore Collection <ArrowRight size={16} />
          </Link>
          <Link
            to="/about"
            className="border border-black/20 text-black dark:border-white/20 dark:text-white bg-black/5 dark:bg-white/5 backdrop-blur-sm px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:border-black/50 dark:hover:border-[#f8c8dc]/50 hover:bg-black/10 dark:hover:text-[#f8c8dc] transition-all flex items-center justify-center shadow-sm"
          >
            Our Story
          </Link>
        </motion.div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-40">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-black" />
      </div>
    </section>
  );
};

export default Hero;
