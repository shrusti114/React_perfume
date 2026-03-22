import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Heart, Filter } from 'lucide-react';

const Shop = () => {
  const [products] = useState([
    { _id: '1', name: 'Velvet Oud', price: 210, family: 'Woody', concentration: 'EDP', volume: '100ml', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600' },
    { _id: '2', name: 'Midnight Rose', price: 185, family: 'Floral', concentration: 'EDP', volume: '50ml', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600' },
    { _id: '3', name: 'Crystal Ocean', price: 150, family: 'Citrus', concentration: 'EDT', volume: '100ml', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600' },
    { _id: '4', name: 'Amber Spice', price: 195, family: 'Oriental', concentration: 'EDP', volume: '50ml', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=600' },
    { _id: '5', name: 'Sandalwood Touch', price: 170, family: 'Woody', concentration: 'EDT', volume: '100ml', image: 'https://images.unsplash.com/photo-1650893077759-8dd3383a155c?q=80&w=600' },
    { _id: '6', name: 'Jasmine Mist', price: 140, family: 'Floral', concentration: 'EDT', volume: '50ml', image: 'https://images.unsplash.com/photo-1601660424536-1e64d7883907?q=80&w=600' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ family: 'All', concentration: 'All', volume: 'All' });
  const [showFilters, setShowFilters] = useState(false);

  const families = ['All', 'Floral', 'Woody', 'Citrus', 'Oriental'];
  const concentrations = ['All', 'EDP', 'EDT'];
  const volumes = ['All', '50ml', '100ml'];

  const filteredProducts = products.filter(p => 
    (filters.family === 'All' || p.family === filters.family) &&
    (filters.concentration === 'All' || p.concentration === filters.concentration) &&
    (filters.volume === 'All' || p.volume === filters.volume) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#fafafa] min-h-screen font-sans text-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-16 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-elegant text-[#000000] mb-6">Westion Boutique</h1>
          <p className="text-neutral-500 font-light max-w-2xl mx-auto">
            Discover our complete collection of masterfully crafted fragrances.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col mb-12 gap-6 bg-white p-6 rounded-2xl shadow-sm border border-[#000000]/5">
          <div className="flex justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                <Search size={18} />
              </div>
              <input
                type="text"
                placeholder="Search fragrances..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#fafafa] border border-[#000000]/10 pl-12 pr-4 py-3 rounded-full text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-all"
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#000000] text-white hover:bg-[#FFD1DC] hover:text-[#000000] transition-colors font-semibold uppercase tracking-widest text-sm"
            >
              <Filter size={18} /> Filters
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-[#000000]/5 mt-2 transition-all">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#000000] mb-3">Fragrance Family</h4>
                <div className="flex flex-wrap gap-2">
                  {families.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setFilters({...filters, family: cat})}
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${filters.family === cat ? 'bg-[#FFD1DC] text-[#000000]' : 'bg-[#fafafa] text-neutral-500 border border-[#000000]/10 hover:border-[#FFD1DC]'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#000000] mb-3">Concentration</h4>
                <div className="flex flex-wrap gap-2">
                  {concentrations.map(con => (
                    <button
                      key={con}
                      onClick={() => setFilters({...filters, concentration: con})}
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${filters.concentration === con ? 'bg-[#FFD1DC] text-[#000000]' : 'bg-[#fafafa] text-neutral-500 border border-[#000000]/10 hover:border-[#FFD1DC]'}`}
                    >
                      {con}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest font-bold text-[#000000] mb-3">Volume</h4>
                <div className="flex flex-wrap gap-2">
                  {volumes.map(vol => (
                    <button
                      key={vol}
                      onClick={() => setFilters({...filters, volume: vol})}
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${filters.volume === vol ? 'bg-[#FFD1DC] text-[#000000]' : 'bg-[#fafafa] text-neutral-500 border border-[#000000]/10 hover:border-[#FFD1DC]'}`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-[#000000]/5 flex flex-col">
              <div className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full cursor-pointer hover:bg-[#FFD1DC] hover:text-[#000000] transition-all text-neutral-400">
                <Heart size={18} />
              </div>
              
              <div className="h-80 overflow-hidden relative bg-[#fafafa]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100 mix-blend-multiply" />
              </div>
              
              <div className="p-6 relative z-20 flex-grow flex flex-col justify-end bg-white">
                <div className="flex gap-2 mb-2">
                  <span className="bg-[#FFD1DC]/30 text-[#000000] px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold">{product.family}</span>
                  <span className="bg-[#fafafa] border border-[#000000]/10 text-neutral-500 px-2 py-0.5 rounded text-[10px] uppercase font-bold">{product.concentration}</span>
                </div>
                <h3 className="text-2xl font-elegant text-[#000000] mb-1">{product.name}</h3>
                <p className="text-xs text-neutral-400 mb-4">{product.volume}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-semibold text-[#000000]">${product.price.toFixed(2)}</span>
                  <button onClick={(e) => { e.preventDefault(); /* add to cart */ }} className="h-10 w-10 bg-[#000000] hover:bg-[#FFD1DC] text-white hover:text-[#000000] rounded-full flex items-center justify-center transition-all shadow-md">
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
