import React from 'react';
import { motion } from 'framer-motion';

const SectionHeading = ({ eyebrow, title, subtitle, centered = true }) => {
  return (
    <div className={`${centered ? 'text-center' : 'text-left'} mb-14`}>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={`inline-flex items-center gap-3 mb-4 ${centered ? 'justify-center' : ''}`}
      >
        <span className="h-px w-10 bg-black/20 dark:bg-[#f8c8dc]/50" />
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-600 dark:text-[#f8c8dc]">{eyebrow}</span>
        <span className="h-px w-10 bg-black/20 dark:bg-[#f8c8dc]/50" />
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-serif mb-4 leading-tight text-black dark:text-white"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className={`text-base max-w-xl leading-relaxed font-light text-neutral-600 dark:text-neutral-400 ${centered ? 'mx-auto' : ''}`}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

export default SectionHeading;
