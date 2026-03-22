import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Explore = () => {
  return (
    <div className="bg-[#fafafa] min-h-screen font-sans text-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:px-12">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-7xl font-elegant text-[#000000] mb-6">Explore Collections</h1>
          <p className="text-neutral-500 font-light max-w-2xl mx-auto text-lg">
            Journey through our exclusive fragrance families. Discover the scent that belongs to you.
          </p>
        </div>

        <div className="space-y-32">
          {/* Collection 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group">
            <div className="order-2 lg:order-1">
              <h4 className="flex items-center gap-3 text-[#000000] font-bold text-sm uppercase tracking-widest mb-4">
                <span className="w-12 h-0.5 bg-[#FFD1DC]"></span> Collection I
              </h4>
              <h2 className="text-5xl lg:text-6xl font-elegant text-[#000000] mb-8">The Floral Symphony</h2>
              <p className="text-neutral-600 font-light leading-relaxed mb-10 text-lg">
                A tribute to the world's most exquisite gardens. Envelop yourself in the delicate essence of rose, the intoxicating notes of jasmine, and the timeless romance of blooming botanicals. Our Floral collection is airiness captured in glass.
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 bg-[#000000] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FFD1DC] hover:text-[#000000] transition-all transform hover:-translate-y-1 shadow-md">
                Explore Floral <ArrowRight size={16} />
              </Link>
            </div>
            <div className="order-1 lg:order-2 overflow-hidden rounded-[2rem] shadow-xl relative bg-white p-4 pb-12 rotate-2 hover:rotate-0 transition-all duration-700">
              <div className="overflow-hidden rounded-2xl h-[500px]">
                <img src="https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1000" alt="Floral Perfume" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 origin-center" />
              </div>
            </div>
          </div>

          {/* Collection 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center group">
            <div className="overflow-hidden rounded-[2rem] shadow-xl relative bg-white p-4 pb-12 -rotate-2 hover:rotate-0 transition-all duration-700">
              <div className="overflow-hidden rounded-2xl h-[500px]">
                <img src="https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1000" alt="Woody Perfume" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 origin-center" />
              </div>
            </div>
            <div className="pl-0 lg:pl-12">
              <h4 className="flex items-center gap-3 text-[#000000] font-bold text-sm uppercase tracking-widest mb-4">
                <span className="w-12 h-0.5 bg-[#FFD1DC]"></span> Collection II
              </h4>
              <h2 className="text-5xl lg:text-6xl font-elegant text-[#000000] mb-8">Deep Woods & Amber</h2>
              <p className="text-neutral-600 font-light leading-relaxed mb-10 text-lg">
                Warm, grounding, and profoundly sophisticated. Notes of cedarwood, amber, and vetiver combine to create an aura of enduring strength. For those who command attention quietly.
              </p>
              <Link to="/shop" className="inline-flex items-center gap-2 bg-[#000000] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FFD1DC] hover:text-[#000000] transition-all transform hover:-translate-y-1 shadow-md">
                Explore Woody <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
