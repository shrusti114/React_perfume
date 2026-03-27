import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Clock, Tag, Sparkles, BookOpen } from 'lucide-react';

const Editorial = () => {
  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen font-sans text-neutral-900 dark:text-neutral-100 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2000"
            alt="Fashion Brand Editorial"
            className="w-full h-full object-cover object-center opacity-90 dark:opacity-60"
          />
          {/* Gradients for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 dark:from-black via-transparent to-black/30" />
          <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <span className="inline-block py-1 px-3 border border-white/40 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
            The Autumn / Winter Issue
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Sartorial <br className="hidden md:block"/> Elegance
          </h1>
          <p className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-2xl mx-auto tracking-wide drop-shadow-md">
            Redefining modern luxury. Discover the new era of streetwear couture and timeless silhouettes designed for the bold.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="bg-white text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#FFD1DC] hover:text-black transition-all transform hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-2"
            >
              Explore Collection <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. NEW COLLECTION SECTION */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-serif mb-4 flex items-center justify-center gap-3">
            <Sparkles className="text-[#FFD1DC] dark:text-[#f8c8dc]" /> New Collection
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl mx-auto font-light leading-relaxed">
            The "Midnight Mirage" series. A seamless fusion of contemporary streetwear and high-end festive attire. Tailored lines meet effortless drape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { name: "Silk Noir Blazer", desc: "Structured velvet with satin lapels.", price: "$350", img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600" },
            { name: "Oversized Cashmere Coat", desc: "Your winter wardrobe staple, redefined.", price: "$420", img: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=600" },
            { name: "Pleated Wide-Leg Trousers", desc: "Fluid movement and sharp tailoring.", price: "$180", img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600" }
          ].map((item, i) => (
            <div key={i} className="group cursor-pointer">
              <div className="h-[450px] overflow-hidden rounded-2xl mb-6 relative bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/10">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
                  <button className="bg-white text-black h-10 w-10 rounded-full flex items-center justify-center hover:bg-[#FFD1DC] transition-colors shadow-lg">
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
              <div className="px-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-serif font-bold text-black dark:text-white">{item.name}</h3>
                  <span className="font-semibold text-black dark:text-white">{item.price}</span>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ITEM LAUNCH SECTION */}
      <section className="py-24 bg-white dark:bg-white/5 border-y border-black/5 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/20 text-xs font-bold uppercase tracking-widest mb-6 text-black dark:text-white">
                <Clock size={14} className="text-[#FFD1DC] dark:text-[#f8c8dc]" /> Just Launched
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-6 leading-tight">
                The Signature <br/><span className="italic text-neutral-400 dark:text-neutral-500">Monogram Tote</span>
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-6 font-light">
                Crafted from ethically sourced full-grain leather, the new Monogram Tote represents the pinnacle of artisanal craftsmanship. It's not just an accessory; it's a profound statement of style.
              </p>
              <ul className="space-y-4 mb-10">
                {[
                  "Hand-stitched reinforced handles",
                  "Signature gold-plated hardware",
                  "Spacious interior for the modern nomad"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#FFD1DC] dark:bg-[#f8c8dc]" /> {feature}
                  </li>
                ))}
              </ul>
              <Link to="/shop" className="inline-block bg-black text-white dark:bg-white dark:text-black hover:bg-[#FFD1DC] dark:hover:bg-[#f8c8dc] hover:text-black border border-transparent px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all shadow-xl">
                Shop The Tote
              </Link>
            </div>
            
            <div className="order-1 lg:order-2 relative">
              <div className="absolute -inset-4 bg-[#FFD1DC]/20 dark:bg-[#f8c8dc]/10 rounded-[3rem] blur-3xl" />
              <img 
                src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?q=80&w=800" 
                alt="Signature Leather Tote" 
                className="relative rounded-[2rem] w-full object-cover shadow-2xl border border-black/5 dark:border-white/10"
              />
              <div className="absolute bottom-6 right-6 bg-white/90 dark:bg-black/80 backdrop-blur-md p-4 rounded-xl border border-black/5 dark:border-white/10 shadow-lg">
                <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-1">Price</p>
                <p className="text-xl font-serif font-bold text-black dark:text-white">$890</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SALE / OFFERS SECTION */}
      <section className="py-24 px-6 lg:px-12 relative overflow-hidden bg-neutral-900 border-b border-white/10">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
          <img src="https://images.unsplash.com/photo-1563241527-300ecb1399cb?q=80&w=2000" alt="Texture bg" className="w-full h-full object-cover grayscale" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-white text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm">
            <Tag size={14} className="text-[#FFD1DC]" /> Limited Time Offer
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Archive Sale</h2>
          <h3 className="text-3xl md:text-4xl font-light text-[#FFD1DC] mb-8 italic">Up to 50% Off Select Styles</h3>
          <p className="text-neutral-300 mb-10 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            The pieces you've coveted all season are finally marked down. Inventory is strictly limited to on-hand stock. Once they're gone, they're archived forever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/shop" className="bg-[#FFD1DC] text-black px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] hover:bg-white transition-all transform hover:-translate-y-1 shadow-2xl shadow-[#FFD1DC]/20">
              Access the Sale
            </Link>
            <p className="text-white/60 text-sm flex items-center gap-2">
              <Clock size={16} /> Ends in 48 Hours
            </p>
          </div>
        </div>
      </section>

      {/* 5. BLOG / EDITORIAL CONTENT SECTION */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-serif text-black dark:text-white mb-4 flex items-center gap-3">
              <BookOpen className="text-[#FFD1DC] dark:text-[#f8c8dc]" /> The Style Edit
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 font-light">
              Trend forecasting, outfit inspiration, and stories from our atelier.
            </p>
          </div>
          <Link to="/explore" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-[#FFD1DC] dark:hover:text-[#f8c8dc] transition-colors">
            Read All Articles <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Featured Article */}
          <article className="group cursor-pointer">
            <div className="rounded-[2rem] overflow-hidden mb-6 h-[400px] border border-black/5 dark:border-white/10 relative">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800" alt="Styling Tips" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/80 backdrop-blur text-black dark:text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                Style Guide
              </div>
            </div>
            <h3 className="text-2xl font-serif text-black dark:text-white mb-3 group-hover:underline decoration-[#FFD1DC] dark:decoration-[#f8c8dc] underline-offset-4">
              Transitional Dressing: Moving From Summer to Autumn
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed mb-4 line-clamp-2">
              Master the art of layering as the seasons shift. We decode how to mix lightweight summer pieces with structured autumn coats for an effortlessly chic transitional wardrobe that works in any climate.
            </p>
            <span className="text-xs uppercase tracking-widest font-bold text-neutral-500 dark:text-neutral-500 flex items-center gap-2">
              Read Article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </article>

          <div className="space-y-12">
            {[
              { category: "Trends", title: "Why Monochromatic Outfits Are Dominating the Runways", date: "Oct 12, 2026", img: "https://images.unsplash.com/photo-1550614000-4b95d415d862?q=80&w=300" },
              { category: "Atelier", title: "Behind the Seams: How Our Cashmere Is Sourced", date: "Oct 05, 2026", img: "https://images.unsplash.com/photo-1601925260368-ae2f83cfecb7?q=80&w=300" }
            ].map((post, i) => (
              <article key={i} className="flex gap-6 group cursor-pointer items-center">
                <div className="h-40 w-1/3 shrink-0 rounded-2xl overflow-hidden border border-black/5 dark:border-white/10">
                  <img src={post.img} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD1DC] dark:text-[#f8c8dc] mb-2 block">{post.category}</span>
                  <h3 className="text-lg md:text-xl font-serif text-black dark:text-white mb-3 group-hover:underline decoration-[#FFD1DC] dark:decoration-[#f8c8dc] underline-offset-4 leading-snug">
                    {post.title}
                  </h3>
                  <span className="text-xs text-neutral-400">{post.date}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOOTER CTA SECTION */}
      <section className="py-32 bg-[#fafafa] dark:bg-neutral-900 border-t border-black/5 dark:border-white/5 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500 dark:text-[#f8c8dc] mb-6 block">Join the Front Row</span>
          <h2 className="text-4xl md:text-6xl font-serif text-black dark:text-white mb-8">
            Stay Ahead of the Trends.
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light mb-12 max-w-xl mx-auto leading-relaxed">
            Subscribe to our editorial newsletter for early access to product drops, styling notes, and exclusive invitations to archive sales.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="flex-1 px-6 py-4 rounded-full border border-black/10 dark:border-white/20 bg-white dark:bg-black/50 text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-all"
              required 
            />
            <button 
              type="submit" 
              className="bg-black text-white dark:bg-white dark:text-black hover:bg-[#FFD1DC] dark:hover:bg-[#f8c8dc] hover:text-black px-8 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-all shadow-xl"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      
    </div>
  );
};

export default Editorial;
