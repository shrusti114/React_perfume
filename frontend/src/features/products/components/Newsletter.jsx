import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-24 bg-[#fed9e3] dark:bg-[#f8c8dc]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-black/50 text-[10px] font-bold uppercase tracking-[0.3em] mb-4"
        >
          Exclusive Access
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-5xl font-serif text-black mb-4"
        >
          Join the Inner Circle
        </motion.h2>
        <p className="text-black/60 text-base mb-10 font-light leading-relaxed">
          Find your perfect fragrance today and redefine your style with every spray. Whether you’re looking for something bold, subtle, or unforgettable, your signature scent is waiting for you.
        </p>
        
        {subscribed ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-black text-black dark:text-[#f8c8dc] py-5 px-8 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl border border-black/5"
          >
            ✓ Welcome to Velvora. Your journey begins.
          </motion.div>
        ) : (
          <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 bg-white/50 dark:bg-black/10 border border-black/10 dark:border-black/20 rounded-full px-6 py-4 text-black placeholder-black/40 focus:outline-none focus:border-black/40 focus:bg-white dark:focus:bg-black/20 transition-all text-sm shadow-sm"
            />
            <button
              type="submit"
              className="bg-black text-white dark:text-[#f8c8dc] px-7 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 dark:hover:bg-neutral-900 transition-all flex items-center gap-2 shadow-lg"
            >
              <Send size={14} />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Newsletter;
