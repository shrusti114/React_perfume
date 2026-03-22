import React from 'react';

const About = () => {
  return (
    <div className="bg-[#fafafa] min-h-screen text-neutral-800 font-sans">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[#000000]">
          <img src="https://images.unsplash.com/photo-1590736969955-71cc94801759?q=80&w=2000" alt="Westion Heritage" className="w-full h-full object-cover mix-blend-overlay opacity-60" />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-elegant text-white mb-6">Our Heritage</h1>
          <p className="text-[#FFD1DC] font-medium uppercase tracking-widest text-sm max-w-xl mx-auto">
            Crafting liquid memories since 1994
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h4 className="flex items-center gap-3 text-[#000000] font-bold text-sm uppercase tracking-widest mb-4">
            <span className="w-12 h-0.5 bg-[#FFD1DC]"></span> The Philosophy
          </h4>
          <h2 className="text-4xl md:text-5xl font-elegant text-[#000000] mb-8 leading-tight">Art in a Bottle</h2>
          <p className="text-neutral-600 font-light leading-relaxed mb-6 text-lg">
            At Westion, we believe that perfumery is an invisible art form. It is the ultimate accessory, the subtle signature that precedes you and lingers long after you depart.
          </p>
          <p className="text-neutral-600 font-light leading-relaxed text-lg">
            Sourced from the rarest ingredients stretching from the coasts of Calabria to the deep woods of Madagascar, our master perfumers distill raw emotion and memories into every flacon.
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-[#FFD1DC]/20 -rotate-6 rounded-[2rem] transform origin-bottom-left"></div>
          <img src="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800" alt="Perfume Ingredients" className="relative z-10 rounded-[2rem] shadow-xl w-full object-cover h-[500px]" />
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="bg-white py-24 border-y border-[#000000]/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <h4 className="inline-flex items-center gap-3 text-[#000000] font-bold text-sm uppercase tracking-widest mb-6">
            <span className="w-8 h-0.5 bg-[#FFD1DC]"></span> Committment <span className="w-8 h-0.5 bg-[#FFD1DC]"></span>
          </h4>
          <h2 className="text-4xl md:text-5xl font-elegant text-[#000000] mb-8">Conscious Luxury</h2>
          <p className="text-neutral-600 font-light leading-relaxed max-w-3xl mx-auto text-lg mb-12">
            True luxury does not command a cost from nature. Westion ensures that 100% of our botanical ingredients are ethically sourced, providing fair wages to farmers globally while using infinitely recyclable glass for all our bottles.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#fafafa] p-8 rounded-2xl border border-[#000000]/5 shadow-sm">
              <h3 className="text-4xl font-elegant text-[#FFD1DC] mb-4">100%</h3>
              <p className="text-[#000000] font-bold uppercase tracking-widest text-xs">Ethically Sourced</p>
            </div>
            <div className="bg-[#fafafa] p-8 rounded-2xl border border-[#000000]/5 shadow-sm">
              <h3 className="text-4xl font-elegant text-[#FFD1DC] mb-4">Zero</h3>
              <p className="text-[#000000] font-bold uppercase tracking-widest text-xs">Animal Testing</p>
            </div>
            <div className="bg-[#fafafa] p-8 rounded-2xl border border-[#000000]/5 shadow-sm">
              <h3 className="text-4xl font-elegant text-[#FFD1DC] mb-4">Infinite</h3>
              <p className="text-[#000000] font-bold uppercase tracking-widest text-xs">Recyclable Materials</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
