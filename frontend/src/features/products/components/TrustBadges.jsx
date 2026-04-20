import React from 'react';
import { Truck, ShieldCheck, Crown, Gem } from 'lucide-react';
import { motion } from 'framer-motion';

const TrustBadges = ({ brandsCount, productsCount }) => {
  const items = [
    { icon: <Truck size={22} />, title: 'Free Worldwide Delivery', sub: 'On orders over ₹15000' },
    { icon: <ShieldCheck size={22} />, title: '100% Authentic', sub: 'Guaranteed genuine' },
    { icon: <Crown size={22} />, title: `${brandsCount} Luxury Brands`, sub: 'Curated collection' },
    { icon: <Gem size={22} />, title: `${productsCount?.toLocaleString()} Perfumes`, sub: "World's largest selection" },
  ];

  return (
    <section className="py-12 border-y border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {items.map((item, idx) => (
          <motion.div 
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="flex flex-col items-center text-center gap-3 group"
          >
            <div className="text-black dark:text-[#f8c8dc] group-hover:scale-110 transition-transform duration-300">
              {item.icon}
            </div>
            <h4 className="font-bold text-black dark:text-white text-[10px] uppercase tracking-widest">{item.title}</h4>
            <p className="text-neutral-500 text-[9px] uppercase tracking-tighter">{item.sub}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadges;
