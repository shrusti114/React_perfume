import React, { useState } from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowRight, Star, Droplets, TreePine, Flower2, Flame, Crown, Heart, Eye, ShoppingBag } from 'lucide-react';
import Breadcrumb from '../components/common/navigation/Breadcrumb';
import { useProducts } from '../hooks/useApi';

const collections = [
  {
    id: 'floral',
    number: 'I',
    icon: <Flower2 size={32} />,
    title: 'The Floral Symphony',
    family: 'Floral',
    tagline: 'Romance bottled in glass',
    description: 'A tribute to the world\'s most exquisite gardens. Envelop yourself in rose, jasmine, peony, and lily of the valley — each bloom captured at the peak of its fragrant life.',
    ingredients: ['Rose', 'Jasmine', 'Peony', 'Tuberose', 'Iris'],
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000',
    accent: '#f8c8dc',
  },
  {
    id: 'woody',
    number: 'II',
    icon: <TreePine size={32} />,
    title: 'Deep Woods & Amber',
    family: 'Woody',
    tagline: 'Strength in silence',
    description: 'Warm, grounding, and profoundly sophisticated. Cedarwood, sandalwood, oud, and vetiver combine to create an aura of enduring presence and quiet power.',
    ingredients: ['Cedar', 'Sandalwood', 'Oud', 'Vetiver', 'Patchouli'],
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000',
    accent: '#d4af37',
  },
  {
    id: 'fresh',
    number: 'III',
    icon: <Droplets size={32} />,
    title: 'Crystal Waters',
    family: 'Fresh',
    tagline: 'The scent of freedom',
    description: 'Crisp aquatic breezes, sparkling citrus, and green botanicals. Like the first breath of morning air on a Mediterranean coast — effortlessly uplifting.',
    ingredients: ['Bergamot', 'Neroli', 'Fig Leaf', 'Sea Salt', 'Green Tea'],
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=1000',
    accent: '#87CEEB',
  },
  {
    id: 'oriental',
    number: 'IV',
    icon: <Flame size={32} />,
    title: 'Oriental Mystique',
    family: 'Oriental',
    tagline: 'Ancient secrets, modern allure',
    description: 'Warm amber, intoxicating vanilla, and exotic spices from the silk roads. Each spray is a journey through ancient bazaars and candlelit palaces.',
    ingredients: ['Amber', 'Vanilla', 'Saffron', 'Frankincense', 'Cinnamon'],
    image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=1000',
    accent: '#FF8C42',
  },
  {
    id: 'luxury',
    number: 'V',
    icon: <Crown size={32} />,
    title: 'The Luxury Vault',
    family: 'Luxury Collection',
    tagline: 'For the extraordinary few',
    description: 'Our most exclusive niche fragrances. Rare ingredients, limited batches, and bottles that are works of art. Reserved for those who demand the very best.',
    ingredients: ['Oud Assafi', 'Damask Rose', 'Ambergris', 'Musk', 'Gold Absolute'],
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000',
    accent: '#d4af37',
  },
];

const Explore = () => {
  const [activeCollection, setActiveCollection] = useState(null);
  const { data: allProducts = [] } = useProducts();

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen font-sans text-neutral-800 dark:text-neutral-200 transition-colors duration-300">

      {/* ── Hero ──────────────────────── */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2000"
            alt="Perfume Bottles"
            className="w-full h-full object-cover opacity-50 dark:opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/50 to-transparent dark:from-black dark:via-black/50 dark:to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-neutral-500 dark:text-[#f8c8dc] mb-4">Discover Your Scent</p>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-black dark:text-white mb-6 leading-[0.9]">
            Explore<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#f8c8dc]">Perfume Collections</span>
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 font-light max-w-2xl mx-auto text-lg">
            Journey through five distinct fragrance families. Find the perfume that speaks your language.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-12">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Explore Perfumes', path: '/explore' },
        ]} />
      </div>

      {/* ── Category Nav ─────────────── */}
      <div className="max-w-5xl mx-auto px-6 pb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {collections.map((c) => {
            const count = allProducts.filter(p => p.family === c.family).length;
            return (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="group flex items-center gap-2 px-5 py-3 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 hover:border-[#f8c8dc] dark:hover:border-[#f8c8dc]/50 hover:shadow-lg transition-all text-xs uppercase tracking-widest font-bold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white"
              >
                <span style={{ color: c.accent }}>{c.icon && React.cloneElement(c.icon, { size: 14 })}</span>
                {c.family}
                <span className="text-[9px] bg-neutral-100 dark:bg-white/10 px-2 py-0.5 rounded-full text-neutral-400">{count}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* ── Collection Sections ──────── */}
      <div className="space-y-0">
        {collections.map((c, idx) => {
          const products = allProducts.filter(p => p.family === c.family).slice(0, 4);
          const isReversed = idx % 2 !== 0;

          return (
            <section
              key={c.id}
              id={c.id}
              className={`py-24 ${idx % 2 === 0 ? 'bg-white dark:bg-neutral-950' : 'bg-neutral-50 dark:bg-black'} border-t border-black/5 dark:border-white/5`}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Collection Header */}
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16 ${isReversed ? 'lg:direction-rtl' : ''}`}>
                  <div className={`${isReversed ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-12 h-0.5" style={{ backgroundColor: c.accent }} />
                      <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: c.accent }}>Collection {c.number}</span>
                    </div>
                    <h2 className="text-4xl lg:text-5xl font-serif text-black dark:text-white mb-4 leading-tight">{c.title}</h2>
                    <p className="text-sm italic mb-6" style={{ color: c.accent }}>"{c.tagline}"</p>
                    <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-8 text-base">{c.description}</p>

                    {/* Key Notes */}
                    <div className="mb-8">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-neutral-400 mb-3">Key Notes</p>
                      <div className="flex flex-wrap gap-2">
                        {c.ingredients.map((ing) => (
                          <span key={ing} className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border" style={{ borderColor: `${c.accent}40`, color: c.accent }}>
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>

                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:shadow-xl transition-all transform hover:-translate-y-1"
                      style={{ backgroundColor: c.accent, color: c.accent === '#f8c8dc' || c.accent === '#87CEEB' ? '#000' : '#fff' }}
                    >
                      Explore {c.family} <ArrowRight size={14} />
                    </Link>
                  </div>

                  {/* Big Image */}
                  <div className={`${isReversed ? 'lg:order-1' : ''} relative group`}>
                    <div className="overflow-hidden rounded-3xl shadow-xl">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-1000"
                      />
                    </div>
                    <div className="absolute top-6 left-6 w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-xl shadow-lg" style={{ backgroundColor: `${c.accent}20`, color: c.accent }}>
                      {c.icon}
                    </div>
                  </div>
                </div>

                {/* Product Cards for this Family */}
                <div>
                  <p className="text-xs uppercase tracking-widest font-bold text-neutral-400 mb-6">Top {c.family} Perfumes</p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                      <div key={product._id} className="group relative bg-white dark:bg-[#0a0a0a] rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-black/5 dark:border-white/5 transition-all duration-500">
                        {product.badge && (
                          <span className="absolute top-3 left-3 z-20 text-white text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shadow-lg" style={{ backgroundColor: c.accent, color: c.accent === '#f8c8dc' || c.accent === '#87CEEB' ? '#000' : '#fff' }}>
                            {product.badge}
                          </span>
                        )}
                        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="bg-white/90 dark:bg-black/80 p-1.5 rounded-full hover:scale-110 transition-transform shadow"><Heart size={12} /></button>
                          <button className="bg-white/90 dark:bg-black/80 p-1.5 rounded-full hover:scale-110 transition-transform shadow"><Eye size={12} /></button>
                        </div>
                        <Link to={`/product/${product._id}`} className="block h-52 overflow-hidden bg-neutral-100 dark:bg-[#111]">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </Link>
                        <div className="p-4">
                          <p className="text-[8px] uppercase tracking-widest text-neutral-400 font-bold mb-0.5">{product.brand}</p>
                          <Link to={`/product/${product._id}`}>
                            <h3 className="text-sm font-serif text-black dark:text-white mb-1 group-hover:transition-colors leading-tight" style={{ '--hover-color': c.accent }}>{product.name}</h3>
                          </Link>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5 dark:border-white/5">
                            <span className="text-sm font-bold text-black dark:text-white">₹{product.price}</span>
                            <div className="flex items-center gap-0.5 text-[#d4af37]">
                              <Star size={9} className="fill-current" />
                              <span className="text-[9px] font-bold text-black dark:text-white">{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* ── CTA ──────────────────────── */}
      <section className="py-24 bg-gradient-to-br from-[#f8c8dc]/15 via-neutral-50 to-[#d4af37]/10 dark:from-[#f8c8dc]/5 dark:via-black dark:to-[#d4af37]/5 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-6">Ready to Discover?</h2>
          <p className="text-neutral-600 dark:text-neutral-400 font-light mb-10 text-lg">
            Browse our full collection of {allProducts.length} perfumes from world-class brands.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-black text-white dark:bg-[#f8c8dc] dark:text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 dark:hover:bg-white hover:shadow-2xl transition-all transform hover:-translate-y-1"
          >
            Shop All Perfumes <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export const Route = createFileRoute('/explore')({
  component: Explore,
});
