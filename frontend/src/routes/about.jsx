import React, { useEffect, useRef } from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { ArrowRight, Star, Leaf, Gem, Globe, Heart, Award, Sparkles } from 'lucide-react';
import Breadcrumb from '../components/common/navigation/Breadcrumb';

/* ── Animate on scroll hook ───────────── */
const useScrollReveal = () => {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return ref;
};

const RevealSection = ({ children, className = '', delay = '0ms' }) => {
  const ref = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-1000 ease-out ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
};

const About = () => {
  const stats = [
    { number: '200+', label: 'Luxury Brands', icon: <Award size={20} /> },
    { number: '2,000+', label: 'Unique Perfumes', icon: <Gem size={20} /> },
    { number: '50+', label: 'Countries Served', icon: <Globe size={20} /> },
    { number: '100%', label: 'Authentic Guarantee', icon: <Heart size={20} /> },
  ];

  const values = [
    { icon: <Leaf size={28} />, title: 'Ethically Sourced', desc: 'Every ingredient is traceable. We partner directly with farmers in Grasse, Calabria, Madagascar and Tamil Nadu to ensure fair trade and sustainable harvesting practices.', color: 'from-emerald-500/20 to-emerald-500/5' },
    { icon: <Gem size={28} />, title: 'Artisan Crafted', desc: 'Our perfumers are trained in the centuries-old French tradition of haute parfumerie. Each fragrance undergoes 12–18 months of development before it earns the Velvora seal.', color: 'from-amber-500/20 to-amber-500/5' },
    { icon: <Heart size={28} />, title: 'Cruelty Free', desc: 'Zero animal testing, always. We use advanced molecular science to create luxurious scents without compromising our ethical standards. PETA certified and proud.', color: 'from-rose-500/20 to-rose-500/5' },
    { icon: <Globe size={28} />, title: 'Global Heritage', desc: 'From the souks of Oman to the lavender fields of Provence — we source the world\'s rarest ingredients. Omani frankincense, Bulgarian rose, Indian sandalwood.', color: 'from-blue-500/20 to-blue-500/5' },
  ];

  const milestones = [
    { year: '2020', title: 'The Dream Begins', desc: 'Velvora was founded in Mumbai with a vision to curate the world\'s finest fragrances under one roof.' },
    { year: '2021', title: 'First 50 Brands', desc: 'Partnerships established with iconic houses including Chanel, Dior, and Tom Ford.' },
    { year: '2022', title: 'Going Global', desc: 'Expanded to 30 countries with premium packaging and same-day luxury delivery in major cities.' },
    { year: '2023', title: '1,000 Perfumes', desc: 'Crossed the milestone of 1,000 curated fragrances. Launched the Velvora Exclusive Collection.' },
    { year: '2024', title: 'Niche Revolution', desc: 'Onboarded 100 niche perfumeries — Le Labo, Byredo, Maison Francis Kurkdjian and more.' },
    { year: '2025', title: '2,000 & Beyond', desc: '200 brands, 2,000 perfumes. Recognized as the world\'s most curated luxury fragrance destination.' },
  ];

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen text-neutral-800 dark:text-neutral-200 font-sans transition-colors duration-300">

      {/* ── CSS for scroll animations ──── */}
      <style>{`
        .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .float-anim { animation: float 6s ease-in-out infinite; }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .shimmer { background: linear-gradient(90deg, transparent, rgba(248,200,220,0.2), transparent); background-size: 200% 100%; animation: shimmer 3s infinite; }
      `}</style>

      {/* ── HERO ────────────────────────── */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1547887538-047f5c5e9bd7?q=80&w=2000"
            alt="Velvora Heritage"
            className="w-full h-full object-cover opacity-60 dark:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-50 via-neutral-50/40 to-transparent dark:from-black dark:via-black/60 dark:to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-50/60 to-transparent dark:from-black/60 dark:to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-black/10 dark:border-[#f8c8dc]/20 bg-black/5 dark:bg-white/5 backdrop-blur-md mb-8 text-neutral-600 dark:text-[#f8c8dc] text-[10px] font-bold uppercase tracking-[0.3em]">
            <Sparkles size={12} /> Est. 2020 · Velvora Parfum House
          </div>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-black dark:text-white mb-6 leading-[0.9]">
            The Art of<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f8c8dc] to-[#d4af37] dark:from-[#f8c8dc] dark:via-white dark:to-[#f8c8dc]">Fragrance</span>
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Where the rarest ingredients meet the boldest imagination. Every Velvora bottle is a masterpiece — crafted to become your invisible signature.
          </p>
        </div>

        {/* Floating perfume bottles */}
        <div className="absolute bottom-8 left-8 w-20 h-20 rounded-full bg-[#f8c8dc]/10 float-anim" style={{ animationDelay: '0s' }} />
        <div className="absolute top-24 right-16 w-14 h-14 rounded-full bg-[#d4af37]/10 float-anim" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-24 right-32 w-10 h-10 rounded-full bg-[#f8c8dc]/15 float-anim" style={{ animationDelay: '4s' }} />
      </section>

      {/* ── BREADCRUMB ──────────────────── */}
      <div className="max-w-7xl mx-auto px-6 pt-12 lg:px-12">
        <Breadcrumb items={[
          { label: 'Home', path: '/' },
          { label: 'About Velvora', path: '/about' },
        ]} />
      </div>

      {/* ── STATS BAR ──────────────────── */}
      <RevealSection>
        <section className="py-16 border-b border-black/5 dark:border-white/5">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[#f8c8dc]/10 dark:bg-[#f8c8dc]/5 flex items-center justify-center text-[#d4af37] dark:text-[#f8c8dc] group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <p className="text-3xl md:text-4xl font-serif font-bold text-black dark:text-white mb-1">{s.number}</p>
                <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold">{s.label}</p>
              </div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* ── OUR STORY ──────────────────── */}
      <RevealSection>
        <section className="max-w-7xl mx-auto px-6 py-24 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-[#d4af37] dark:bg-[#f8c8dc]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] dark:text-[#f8c8dc]">Our Philosophy</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-8 leading-tight">
              Perfume is the Most<br />
              <span className="text-[#d4af37] dark:text-[#f8c8dc]">Intense</span> Form of Memory
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed mb-6 font-light">
              At Velvora, we believe fragrance is the invisible art — it speaks before you do and lingers long after you leave. Every scent in our collection has been handpicked by our panel of master perfumers, each one a narrative woven from nature's rarest raw materials.
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 text-base leading-relaxed mb-6 font-light">
              From the Turkish rose fields of Isparta to the sandalwood groves of Mysore, from the frankincense trails of Dhofar to the vanilla orchards of Madagascar — we travel the world so you can wear it.
            </p>
            <p className="text-neutral-500 dark:text-neutral-500 text-base leading-relaxed mb-10 font-light italic">
              "A perfume is not a scent. It is a portal — to a memory, a place, a person you once loved."
              <span className="block mt-2 not-italic font-bold text-black dark:text-[#f8c8dc] text-xs uppercase tracking-widest">— The Velvora Manifesto</span>
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-black text-white dark:bg-[#f8c8dc] dark:text-black hover:bg-neutral-800 dark:hover:bg-white px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all transform hover:-translate-y-1"
            >
              Explore Our Collection <ArrowRight size={14} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-[#f8c8dc]/20 via-transparent to-[#d4af37]/10 rounded-3xl blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800"
                alt="Perfume Craftsmanship"
                className="w-full h-[550px] object-cover hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-black border border-black/5 dark:border-[#f8c8dc]/20 rounded-2xl p-6 shadow-xl backdrop-blur-md">
              <p className="text-[#d4af37] dark:text-[#f8c8dc] text-xs font-bold uppercase tracking-[0.3em] mb-1">Since 2020</p>
              <p className="text-black dark:text-white font-serif text-lg">Velvora Parfum House</p>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── OUR VALUES ─────────────────── */}
      <RevealSection>
        <section className="py-24 bg-white dark:bg-neutral-950 border-y border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-[#d4af37] dark:bg-[#f8c8dc]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] dark:text-[#f8c8dc]">What We Stand For</span>
                <span className="h-px w-10 bg-[#d4af37] dark:bg-[#f8c8dc]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-4">Our Values</h2>
              <p className="text-neutral-600 dark:text-neutral-400 font-light max-w-xl mx-auto">The principles that make every Velvora fragrance extraordinary.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <RevealSection key={v.title} delay={`${i * 150}ms`}>
                  <div className="group bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-2xl p-8 hover:shadow-xl hover:border-[#f8c8dc]/30 dark:hover:border-[#f8c8dc]/30 transition-all duration-500">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${v.color} flex items-center justify-center text-[#d4af37] dark:text-[#f8c8dc] mb-6 group-hover:scale-110 transition-transform`}>
                      {v.icon}
                    </div>
                    <h3 className="text-xl font-serif text-black dark:text-white mb-3">{v.title}</h3>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed font-light">{v.desc}</p>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── TIMELINE ───────────────────── */}
      <RevealSection>
        <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-[#d4af37] dark:bg-[#f8c8dc]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] dark:text-[#f8c8dc]">Our Journey</span>
              <span className="h-px w-10 bg-[#d4af37] dark:bg-[#f8c8dc]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-4">The Velvora Story</h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#d4af37] via-[#f8c8dc] to-[#d4af37] dark:from-[#f8c8dc] dark:via-[#d4af37] dark:to-[#f8c8dc] hidden md:block" />
            
            <div className="space-y-12 md:space-y-0">
              {milestones.map((m, i) => (
                <RevealSection key={m.year} delay={`${i * 100}ms`}>
                  <div className={`md:grid md:grid-cols-2 md:gap-12 items-center mb-12 ${i % 2 === 0 ? '' : 'md:direction-rtl'}`}>
                    <div className={`${i % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}`}>
                      <span className="text-5xl font-serif font-bold text-[#d4af37]/20 dark:text-[#f8c8dc]/20">{m.year}</span>
                      <h3 className="text-xl font-serif text-black dark:text-white mt-2 mb-2">{m.title}</h3>
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm font-light leading-relaxed">{m.desc}</p>
                    </div>
                    <div className={`hidden md:flex items-center ${i % 2 === 0 ? 'justify-start' : 'md:order-1 justify-end'}`}>
                      <div className="w-4 h-4 rounded-full bg-[#d4af37] dark:bg-[#f8c8dc] shadow-lg shadow-[#d4af37]/30 dark:shadow-[#f8c8dc]/30" />
                    </div>
                  </div>
                </RevealSection>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── PERFUME CRAFT IMAGE SECTION ── */}
      <RevealSection>
        <section className="py-24 bg-neutral-100 dark:bg-neutral-950">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { img: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600', label: 'The Ingredients' },
              { img: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600', label: 'The Craft' },
              { img: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=600', label: 'The Bottle' },
            ].map((item, i) => (
              <RevealSection key={item.label} delay={`${i * 200}ms`}>
                <div className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer">
                  <img src={item.img} alt={item.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white font-serif text-2xl">{item.label}</p>
                    <div className="w-12 h-0.5 bg-[#f8c8dc] mt-3 group-hover:w-24 transition-all duration-500" />
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* ── CONSCIOUS LUXURY ───────────── */}
      <RevealSection>
        <section className="py-24 border-t border-black/5 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="h-px w-10 bg-[#d4af37] dark:bg-[#f8c8dc]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#d4af37] dark:text-[#f8c8dc]">Commitment</span>
              <span className="h-px w-10 bg-[#d4af37] dark:bg-[#f8c8dc]" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-8">Conscious Luxury</h2>
            <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-3xl mx-auto text-lg mb-14">
              True luxury does not demand a cost from nature. Velvora ensures that every ingredient is ethically sourced, every bottle is crafted from infinitely recyclable glass, and every shipment is carbon-neutral.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { num: '100%', label: 'Ethically Sourced', sub: 'Fair trade partnerships in 12 countries' },
                { num: 'Zero', label: 'Animal Testing', sub: 'PETA certified, always and forever' },
                { num: '♻️', label: 'Recyclable Packaging', sub: 'Glass bottles, soy-based inks, zero plastic' },
              ].map((item) => (
                <div key={item.label} className="group bg-white dark:bg-white/5 border border-black/5 dark:border-white/10 p-10 rounded-2xl hover:shadow-xl hover:border-[#d4af37]/20 dark:hover:border-[#f8c8dc]/30 transition-all duration-300">
                  <h3 className="text-4xl font-serif text-[#d4af37] dark:text-[#f8c8dc] mb-3 group-hover:scale-110 transition-transform">{item.num}</h3>
                  <p className="text-black dark:text-white font-bold uppercase tracking-widest text-xs mb-2">{item.label}</p>
                  <p className="text-neutral-500 text-xs font-light">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ── CTA ────────────────────────── */}
      <RevealSection>
        <section className="py-24 bg-gradient-to-br from-[#f8c8dc]/20 via-neutral-50 to-[#d4af37]/10 dark:from-[#f8c8dc]/5 dark:via-black dark:to-[#d4af37]/5">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-6">
              Your Signature Scent<br />Awaits
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-base font-light mb-10 leading-relaxed">
              Explore 2,000+ handpicked perfumes from 200 world-class brands. Find the fragrance that tells your story.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-black text-white dark:bg-[#f8c8dc] dark:text-black hover:bg-neutral-800 dark:hover:bg-white px-10 py-4 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all transform hover:-translate-y-1 shadow-lg"
            >
              Explore Collection <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </RevealSection>
    </div>
  );
};

export const Route = createFileRoute('/about')({
  component: About,
});
