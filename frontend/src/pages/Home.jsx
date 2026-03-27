import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Star, ShoppingBag, Truck, ShieldCheck,
  Instagram, Twitter, Facebook, Send, Quote, Heart, Eye,
  ChevronRight, Sparkles, Crown, Gem, Layers, Filter
} from 'lucide-react';
import velvoraLogo from '../assets/velvora_logo.png';
import Breadcrumb from '../components/common/Breadcrumb';
import {
  allProducts, brands, perfumeCategories, genderCats,
  featuredProducts, bestSellers, newArrivals, trending, uniqueBrands
} from '../data/perfumeData';

/* ── Product Card ──────────────────────── */
const ProductCard = ({ product }) => (
  <div className="group relative bg-[#ffffff] dark:bg-[#0a0a0a] rounded-xl overflow-hidden shadow-sm hover:shadow-2xl dark:shadow-none transition-all duration-500 border border-[#e5e5e5] dark:border-[#1a1a1a] flex flex-col items-center">
    
    {product.badge && (
      <span className="absolute top-4 left-4 z-20 bg-black text-white dark:bg-[#f8c8dc] dark:text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
        {product.badge}
      </span>
    )}

    {/* Quick Action Overlay */}
    <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-4 group-hover:translate-x-0">
      <button className="bg-white/90 dark:bg-black/80 backdrop-blur-md p-2.5 rounded-full hover:bg-black hover:text-white dark:hover:bg-[#f8c8dc] dark:hover:text-black transition-all text-neutral-600 dark:text-white shadow-lg">
        <Heart size={16} />
      </button>
      <button className="bg-white/90 dark:bg-black/80 backdrop-blur-md p-2.5 rounded-full hover:bg-black hover:text-white dark:hover:bg-[#f8c8dc] dark:hover:text-black transition-all text-neutral-600 dark:text-white shadow-lg">
        <Eye size={16} />
      </button>
    </div>

    <Link to={`/product/${product._id}`} className="w-full h-72 overflow-hidden relative bg-neutral-100 dark:bg-[#111111] flex justify-center items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 mix-blend-multiply dark:mix-blend-normal opacity-90 group-hover:opacity-100"
      />
    </Link>
    
    <div className="p-5 relative z-20 flex-grow flex flex-col w-full bg-white dark:bg-[#0a0a0a]">
      <div className="flex justify-between items-start mb-1">
        <span className="text-neutral-400 dark:text-neutral-500 text-[9px] uppercase tracking-[0.15em] font-bold">{product.brand}</span>
        {product.rating && (
          <div className="flex items-center gap-1 text-[#d4af37]">
            <Star size={10} className="fill-current" />
            <span className="text-[10px] font-bold text-black dark:text-white">{product.rating}</span>
          </div>
        )}
      </div>
      <span className="text-neutral-500 dark:text-[#f8c8dc] text-[8px] uppercase tracking-[0.2em] font-bold mb-2">{product.family} · {product.category}</span>
      
      <Link to={`/product/${product._id}`}>
        <h3 className="text-lg font-serif text-black dark:text-white mb-1 group-hover:text-[#d4af37] dark:group-hover:text-[#f8c8dc] transition-colors leading-tight">{product.name}</h3>
      </Link>
      
      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 font-light line-clamp-2">{product.description}</p>
      
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/5 dark:border-white/5">
        <span className="text-lg font-bold text-black dark:text-white">${product.price}</span>
        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white dark:bg-white/10 dark:text-white hover:bg-neutral-800 dark:hover:bg-[#f8c8dc] dark:hover:text-black rounded-full transition-all text-[10px] font-bold uppercase tracking-widest shadow-md">
          <ShoppingBag size={12} /> Add
        </button>
      </div>
    </div>
  </div>
);

/* ── Section Heading ───────────────────── */
const SectionHeading = ({ eyebrow, title, subtitle }) => (
  <div className="text-center mb-14">
    <div className="inline-flex items-center gap-3 mb-4">
      <span className="h-px w-10 bg-black/20 dark:bg-[#f8c8dc]/50" />
      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-600 dark:text-[#f8c8dc]">{eyebrow}</span>
      <span className="h-px w-10 bg-black/20 dark:bg-[#f8c8dc]/50" />
    </div>
    <h2 className="text-4xl md:text-5xl font-serif mb-4 leading-tight text-black dark:text-white">{title}</h2>
    {subtitle && <p className="text-base max-w-xl mx-auto leading-relaxed font-light text-neutral-600 dark:text-neutral-400">{subtitle}</p>}
  </div>
);

/* ── Home Component ────────────────────── */
const Home = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeBrandPage, setActiveBrandPage] = useState(0);
  const brandsPerPage = 20;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  const displayedBrands = useMemo(() => {
    const start = activeBrandPage * brandsPerPage;
    return uniqueBrands.slice(start, start + brandsPerPage);
  }, [activeBrandPage]);

  const totalBrandPages = Math.ceil(uniqueBrands.length / brandsPerPage);

  const reviews = [
    { name: 'Sophia Laurent', handle: '@sophialaurent', rating: 5, text: 'Velvora\'s Midnight Rose is absolutely transcendent. I\'ve never received so many compliments on a fragrance. It truly lives up to the luxury promise.' },
    { name: 'James Alderton', handle: '@jalderton', rating: 5, text: 'Black Saffron is worth every penny. The longevity is exceptional — I can still smell it the next morning. This is my signature scent now.' },
    { name: 'Priya Mehta', handle: '@priyam_essence', rating: 5, text: 'I ordered La Rose Noire as a gift and was so impressed I ordered one for myself. The packaging alone feels like opening a piece of art.' },
  ];

  return (
    <div className="bg-neutral-50 dark:bg-black text-black dark:text-white min-h-screen font-sans transition-colors duration-300">

      {/* ── HERO ─────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/60 to-transparent dark:from-black dark:via-black/60 dark:to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-50 via-neutral-50/40 to-transparent dark:from-black dark:via-black/40 dark:to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-neutral-50 to-transparent dark:from-black dark:to-transparent" />
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#f8c8dc]/20 dark:bg-[#f8c8dc]/8 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-normal" />
        </div>

        <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 pt-20 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/10 dark:border-[#f8c8dc]/20 bg-black/5 dark:bg-white/5 backdrop-blur-md mb-10 text-neutral-800 dark:text-[#f8c8dc] text-[10px] font-bold uppercase tracking-[0.3em]">
            <Star size={12} className="fill-current" /> {allProducts.length.toLocaleString()} Perfumes · {uniqueBrands.length} Brands
          </div>

          <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 font-bold uppercase tracking-[0.4em] mb-4">Velvora Parfum House</p>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold text-black dark:text-white mb-6 leading-[0.9] tracking-tight">
            Sartorial<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-black via-neutral-700 to-neutral-500 dark:from-white dark:via-[#f8c8dc] dark:to-neutral-400">Elegance</span>
          </h1>
          <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-12 leading-relaxed font-light max-w-2xl mx-auto">
            Redefining modern luxury. Discover the new era of perfume artistry and timeless fragrances designed for the bold.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-black text-white dark:bg-[#f8c8dc] dark:text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-neutral-800 dark:hover:bg-white hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-[#f8c8dc]/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              Explore Collection <ArrowRight size={16} />
            </Link>
            <Link
              to="/about"
              className="border border-black/20 text-black dark:border-white/20 dark:text-white bg-black/5 dark:bg-white/5 backdrop-blur-sm px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:border-black/50 dark:hover:border-[#f8c8dc]/50 hover:bg-black/10 dark:hover:text-[#f8c8dc] transition-all flex items-center justify-center"
            >
              Our Story
            </Link>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-black/30 dark:to-[#f8c8dc]/50" />
          </div>
        </div>
      </section>

      {/* ── TRUST BADGES ─────────────────────── */}
      <section className="py-12 border-y border-black/5 dark:border-white/5">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { icon: <Truck size={22} className="text-black dark:text-[#f8c8dc]" />, title: 'Free Worldwide Delivery', sub: 'On orders over $150' },
            { icon: <ShieldCheck size={22} className="text-black dark:text-[#f8c8dc]" />, title: '100% Authentic', sub: 'Guaranteed genuine' },
            { icon: <Crown size={22} className="text-black dark:text-[#f8c8dc]" />, title: `${uniqueBrands.length} Luxury Brands`, sub: 'Curated collection' },
            { icon: <Gem size={22} className="text-black dark:text-[#f8c8dc]" />, title: `${allProducts.length.toLocaleString()} Perfumes`, sub: 'World\'s largest selection' },
          ].map((item) => (
            <div key={item.title} className="flex flex-col items-center gap-3">
              {item.icon}
              <h4 className="font-bold text-black dark:text-white text-xs uppercase tracking-widest">{item.title}</h4>
              <p className="text-neutral-500 text-[10px]">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PERFUME CATEGORY FAMILIES ─────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Perfume Categories', path: '#' },
        ]} />
        <SectionHeading eyebrow="Browse by Scent" title="Perfume Categories" subtitle={`Explore ${allProducts.length.toLocaleString()} perfumes across 5 fragrance families`} />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {perfumeCategories.map((cat) => (
            <Link
              key={cat.name}
              to="/shop"
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 dark:opacity-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-5">
                <h3 className="text-xl font-serif text-white mb-0.5">{cat.name}</h3>
                <p className="text-neutral-300 text-[10px] font-light mb-1">{cat.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#f8c8dc] text-[10px] font-bold uppercase tracking-widest">{cat.count} Perfumes</span>
                  <ArrowRight size={14} className="text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── GENDER CATEGORIES ────────────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-black/5 dark:border-white/5">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Shop by Gender', path: '#' },
        ]} />
        <SectionHeading eyebrow="Explore" title="Shop by Gender" subtitle="Find your perfect fragrance from our curated collections." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {genderCats.map((cat) => (
            <Link
              key={cat.name}
              to="/shop"
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
            >
              <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 dark:opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="text-white/80 dark:text-[#f8c8dc] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{cat.badge}</span>
                <h3 className="text-3xl font-serif text-white mb-1">{cat.name}</h3>
                <p className="text-neutral-300 dark:text-neutral-400 text-sm font-light">{cat.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest group-hover:text-neutral-300 dark:group-hover:text-[#f8c8dc] transition-colors">
                  Explore <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── FEATURED PERFUMES ─────────────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-black/5 dark:border-white/5">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Featured Collections', path: '#' },
        ]} />
        <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
          <SectionHeading eyebrow="Editor's Choice" title="Featured Fragrances" />
          <Link to="/shop" className="flex items-center gap-2 text-neutral-600 dark:text-[#f8c8dc] text-xs uppercase tracking-widest font-bold hover:text-black dark:hover:text-white transition-colors">
            View All {allProducts.length.toLocaleString()} <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      </section>

      {/* ── NEW ARRIVALS ──────────────────────── */}
      <section className="py-24 bg-white dark:bg-neutral-950 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Breadcrumb items={[
            { label: 'Home', path: '/' },
            { label: 'New Arrivals', path: '#' },
          ]} />
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <SectionHeading eyebrow="Just Landed" title="New Arrivals" subtitle="The latest additions to our growing collection." />
            <Link to="/shop" className="flex items-center gap-2 text-neutral-600 dark:text-[#f8c8dc] text-xs uppercase tracking-widest font-bold hover:text-black dark:hover:text-white transition-colors">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── BEST SELLERS ─────────────────────── */}
      <section className="py-24 bg-neutral-50 dark:bg-black border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Breadcrumb items={[
            { label: 'Home', path: '/' },
            { label: 'Best Sellers', path: '#' },
          ]} />
          <SectionHeading eyebrow="Most Loved" title="Best Sellers" subtitle="The fragrances our customers return to again and again." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── TRENDING NOW ─────────────────────── */}
      <section className="py-24 bg-white dark:bg-neutral-950 border-t border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <Breadcrumb items={[
            { label: 'Home', path: '/' },
            { label: 'Trending', path: '#' },
          ]} />
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12 gap-4">
            <SectionHeading eyebrow="Hot Right Now" title="Trending Perfumes" subtitle="What fragrance lovers are wearing this season." />
            <Link to="/shop" className="flex items-center gap-2 text-neutral-600 dark:text-[#f8c8dc] text-xs uppercase tracking-widest font-bold hover:text-black dark:hover:text-white transition-colors">
              Explore All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trending.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ── BRANDS SHOWCASE ──────────────────── */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto border-t border-black/5 dark:border-white/5">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'Brands', path: '#' },
        ]} />
        <SectionHeading eyebrow="Our Partners" title={`${uniqueBrands.length} World-Class Brands`} subtitle="From iconic fashion houses to niche perfumeries — the best of the fragrance world." />
        
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-8">
          {displayedBrands.map((brand) => (
            <Link
              key={brand}
              to="/shop"
              className="group bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-xl p-4 text-center hover:border-[#f8c8dc] dark:hover:border-[#f8c8dc]/50 hover:shadow-lg transition-all duration-300"
            >
              <p className="text-sm font-serif text-black dark:text-white group-hover:text-[#d4af37] dark:group-hover:text-[#f8c8dc] transition-colors font-semibold truncate">{brand}</p>
              <p className="text-[9px] text-neutral-400 mt-1 uppercase tracking-widest">10 Perfumes</p>
            </Link>
          ))}
        </div>

        {/* Brand Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {Array.from({ length: totalBrandPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setActiveBrandPage(i)}
              className={`w-8 h-8 rounded-full text-[10px] font-bold transition-all ${
                activeBrandPage === i
                  ? 'bg-black text-white dark:bg-[#f8c8dc] dark:text-black'
                  : 'bg-neutral-100 dark:bg-white/5 text-neutral-500 hover:bg-neutral-200 dark:hover:bg-white/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <p className="text-center text-[10px] text-neutral-400 mt-4 uppercase tracking-widest">
          Showing {activeBrandPage * brandsPerPage + 1}–{Math.min((activeBrandPage + 1) * brandsPerPage, uniqueBrands.length)} of {uniqueBrands.length} brands
        </p>
      </section>

      {/* ── ABOUT VELVORA ────────────────────── */}
      <section className="py-24 bg-neutral-100 dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-black/5 dark:bg-[#f8c8dc]/5 rounded-3xl blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1547887538-047f5c5e9bd7?q=80&w=800"
                alt="About Velvora"
                className="relative rounded-2xl w-full h-[500px] object-cover opacity-90 dark:opacity-80"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/80 dark:bg-black/80 backdrop-blur-md border border-white/20 dark:border-[#f8c8dc]/20 rounded-xl p-6 shadow-xl">
                <p className="text-neutral-500 dark:text-[#f8c8dc] text-xs font-bold uppercase tracking-[0.3em] mb-1">Est. 2020</p>
                <p className="text-black dark:text-white font-serif text-xl">Velvora Parfum House</p>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="h-px w-10 bg-black/20 dark:bg-[#f8c8dc]/50" />
                <span className="text-neutral-600 dark:text-[#f8c8dc] text-[10px] font-bold uppercase tracking-[0.3em]">Our Story</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-6 leading-tight">
                Crafted for<br />Those Who Dare<br /><span className="text-neutral-500 dark:text-[#f8c8dc]">to be Remembered</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed mb-6 font-light">
                Velvora was born from a singular obsession — to create the world's largest curated collection of premium fragrances. With {uniqueBrands.length} brands and {allProducts.length.toLocaleString()} unique perfumes, we bring the entire world of luxury scents to your doorstep.
              </p>
              <p className="text-neutral-600 dark:text-neutral-500 text-base leading-relaxed mb-10 font-light">
                We source only the rarest ingredients — Bulgarian roses, Omani frankincense, Madagascar vanilla — every bottle in our collection is handpicked by master perfumers.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-black text-white dark:bg-[#f8c8dc] dark:text-black hover:bg-neutral-800 dark:hover:bg-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all"
              >
                Discover More <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CUSTOMER REVIEWS ─────────────────── */}
      <section className="py-24 bg-neutral-50 dark:bg-black border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" subtitle="Join thousands of fragrance lovers who've found their signature scent." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.name} className="bg-white border border-black/5 dark:bg-white/5 dark:border-white/10 rounded-2xl p-8 hover:shadow-xl dark:hover:border-[#f8c8dc]/20 transition-all duration-300">
                <Quote size={28} className="text-black/10 dark:text-[#f8c8dc]/30 mb-4" />
                <p className="text-neutral-600 dark:text-neutral-300 text-base leading-relaxed font-light mb-6">"{r.text}"</p>
                <div className="flex items-center gap-1 mb-4">
                  {Array(r.rating).fill(0).map((_, i) => (
                    <Star key={i} size={13} className="text-neutral-800 dark:text-[#f8c8dc] fill-current" />
                  ))}
                </div>
                <div className="border-t border-black/5 dark:border-white/5 pt-5">
                  <p className="text-black dark:text-white font-semibold text-sm">{r.name}</p>
                  <p className="text-neutral-500 text-xs mt-0.5">{r.handle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ───────────────────────── */}
      <section className="py-24 bg-[#fed9e3] dark:bg-[#f8c8dc]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="text-black/50 text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Exclusive Access</p>
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-4">Join the Inner Circle</h2>
          <p className="text-black/60 text-base mb-10 font-light leading-relaxed">
            Receive early access to new collections from {uniqueBrands.length} brands, exclusive offers, and expert fragrance guides.
          </p>
          {subscribed ? (
            <div className="bg-white dark:bg-black text-black dark:text-[#f8c8dc] py-5 px-8 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-xl">
              ✓ Welcome to Velvora. Your journey begins.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-white/50 dark:bg-black/10 border border-black/10 dark:border-black/20 rounded-full px-6 py-4 text-black placeholder-black/40 focus:outline-none focus:border-black/40 focus:bg-white dark:focus:bg-black/20 transition-colors text-sm"
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

      {/* ── FOOTER ────────────────────────────── */}
      <footer className="bg-black pt-20 pb-10 border-t border-black/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
                <img src={velvoraLogo} alt="Velvora" className="h-10 w-10 object-contain rounded-full bg-white p-1" />
                <span className="text-xl font-serif font-bold text-white tracking-widest">VELVORA</span>
              </Link>
              <p className="text-neutral-400 max-w-sm leading-relaxed mb-8 font-light text-sm">
                The world's most curated perfume destination. {uniqueBrands.length} brands. {allProducts.length.toLocaleString()} fragrances. One extraordinary experience.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: <Instagram size={18} />, href: '#' },
                  { icon: <Twitter size={18} />, href: '#' },
                  { icon: <Facebook size={18} />, href: '#' },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-neutral-400 hover:border-white hover:text-white dark:hover:border-[#f8c8dc]/50 dark:hover:text-[#f8c8dc] transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Categories</h4>
              <ul className="space-y-4 text-neutral-500 text-sm">
                {perfumeCategories.map((cat) => (
                  <li key={cat.name}>
                    <Link to="/shop" className="hover:text-[#f8c8dc] transition-colors">{cat.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Client Care</h4>
              <ul className="space-y-4 text-neutral-500 text-sm">
                {[
                  { label: 'Contact Us', to: '/contact' },
                  { label: 'Our Story', to: '/about' },
                  { label: 'FAQ', to: '/contact' },
                  { label: 'Shipping Policy', to: '/contact' },
                  { label: 'Returns', to: '/contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="hover:text-[#f8c8dc] transition-colors">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 uppercase tracking-widest font-bold">
            <p>© 2026 Velvora. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#f8c8dc] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#f8c8dc] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
