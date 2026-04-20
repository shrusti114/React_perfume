import React, { useMemo } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Breadcrumb from '../components/common/navigation/Breadcrumb';
import SectionHeading from '../components/common/SectionHeading';
import Hero from '../features/products/components/Hero';
import TrustBadges from '../features/products/components/TrustBadges';
import { CategoryList } from '../features/products/components/CategoryList';
import { ProductGrid } from '../features/products/components/ProductGrid';
import aboutVelvoraImg from '../assets/about_velvora_custom.png';
import { useProducts, useAddToCart } from '../hooks/useApi';

const perfumeCategories = [
  { name: 'Floral', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600', description: 'Rose, Jasmine & Peony' },
  { name: 'Woody', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600', description: 'Cedar, Sandalwood & Oud' },
  { name: 'Fresh', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600', description: 'Citrus, Aquatic & Green' },
  { name: 'Oriental', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=600', description: 'Amber, Vanilla & Spice' },
  { name: 'Luxury Collection', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600', description: 'Rare & Niche Fragrances' },
];

const Home = () => {
  const { data: products = [] } = useProducts();
  const { mutate: addToCart } = useAddToCart();
  const handleAddToCart = (id) => addToCart({ productId: id, quantity: 1 });

  const uniqueBrands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);

  // Derive homepage sections from API data
  const bestSellers = useMemo(() => products.filter(p => p.badge === 'Best Seller').slice(0, 8), [products]);
  const newArrivals = useMemo(() => products.filter(p => p.badge === 'New Arrival' || p.badge === 'Trending').slice(0, 8), [products]);
  const trending = useMemo(() => {
    // Mix of top-rated products not already shown
    const shown = new Set([...bestSellers, ...newArrivals].map(p => p._id));
    return products.filter(p => !shown.has(p._id)).sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 8);
  }, [products, bestSellers, newArrivals]);

  return (
    <div className="bg-neutral-50 dark:bg-black text-black dark:text-white min-h-screen font-sans transition-colors duration-300 overflow-x-hidden">
      
      {/* ── HERO ─────────────────────────────── */}
      <Hero productsCount={products.length} brandsCount={uniqueBrands.length} />

      {/* ── TRUST BADGES ─────────────────────── */}
      <TrustBadges productsCount={products.length} brandsCount={uniqueBrands.length} />

      {/* ── PERFUME CATEGORY FAMILIES ─────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <Breadcrumb items={[{ label: 'Home', path: '/' }, { label: 'Categories', path: '#' }]} />
        <SectionHeading 
          eyebrow="Browse by Scent" 
          title="Perfume Categories" 
          subtitle={`Explore ${products.length} perfumes across 5 fragrance families`} 
        />
        <CategoryList categories={perfumeCategories} />
      </section>

      {/* ── NEW ARRIVALS ──────────────────────── */}
      <section className="py-24 bg-white dark:bg-neutral-950 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <SectionHeading eyebrow="Just Landed" title="New Arrivals" subtitle="Step into the world of our latest creations, where modern sophistication meets timeless charm." centered={false} />
            <Link to="/shop" className="flex items-center gap-2 text-neutral-600 dark:text-[#f8c8dc] text-[10px] uppercase tracking-widest font-bold hover:text-black dark:hover:text-white transition-colors pb-14">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <ProductGrid products={newArrivals} onAddToCart={handleAddToCart} />
        </div>
      </section>

      {/* ── BEST SELLERS ─────────────────────── */}
      <section className="py-24 bg-neutral-50 dark:bg-black border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading eyebrow="Most Loved" title="Best Sellers" subtitle="Loved by our customers, our best sellers define true elegance and quality." />
          <ProductGrid products={bestSellers} onAddToCart={handleAddToCart} />
        </div>
      </section>

      {/* ── ABOUT VELVORA ────────────────────── */}
      <section className="py-24 bg-neutral-100 dark:bg-neutral-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-black/5 dark:bg-[#f8c8dc]/5 rounded-3xl blur-2xl" />
              <img
                src={aboutVelvoraImg}
                alt="About Velvora"
                className="relative rounded-2xl w-full h-[500px] object-cover opacity-90 dark:opacity-80 shadow-2xl"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-white/20 dark:border-[#f8c8dc]/20 rounded-xl p-6 shadow-xl">
                <p className="text-neutral-500 dark:text-[#f8c8dc] text-[10px] font-bold uppercase tracking-[0.3em] mb-1">Authenticity Guaranteed</p>
                <p className="text-black dark:text-white font-serif text-xl underline underline-offset-4 decoration-[#f8c8dc]">Velvora Parfum House</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/20 dark:bg-[#f8c8dc]/50" />
                <span className="text-neutral-600 dark:text-[#f8c8dc] text-[10px] font-bold uppercase tracking-[0.3em]">Our Story</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-6 leading-tight">
                Crafted for<br />Those Who Dare<br /><span className="text-neutral-500 dark:text-[#f8c8dc]">to be Remembered</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed mb-6 font-light">
                We believe that a fragrance is more than just a scent—it's a statement. Our mission is to bring you premium-quality perfumes at accessible prices, blending luxury with everyday wear. Each bottle reflects passion, craftsmanship, and a commitment to excellence.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-black text-white dark:bg-[#f8c8dc] dark:text-black hover:bg-neutral-800 dark:hover:bg-white px-8 py-3.5 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg hover:translate-x-1"
              >
                Discover More <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-24 bg-white dark:bg-neutral-950 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading eyebrow="Hot Right Now" title="Trending Now" subtitle="Stay ahead of the trend with fragrances that are making waves right now." />
          <ProductGrid products={trending} onAddToCart={handleAddToCart} />
        </div>
      </section>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});
