import React from 'react';
import { motion } from 'framer-motion';

const PageBanner = ({ title, subtitle, image }) => {
  return (
    <div className="relative h-48 md:h-56 overflow-hidden">
      <motion.img 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        src={image || "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2000"} 
        alt={title} 
        className="w-full h-full object-cover opacity-40 dark:opacity-20" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 dark:from-black to-transparent" />
      <div className="absolute bottom-8 left-0 right-0 text-center px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-2"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 dark:text-neutral-400 text-sm font-light tracking-widest uppercase"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default PageBanner;
