import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingBag, Heart, Star, Truck, ShieldCheck } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  // Dummy product matching the styling requirements
  const product = {
    _id: id,
    name: 'Midnight Rose',
    price: 185.00,
    family: 'Floral',
    concentration: 'EDP',
    volume: '50ml',
    description: 'An enchanting bouquet of deep red roses at midnight, interlaced with subtle hints of dark berries and a smoky vanilla base. Midnight Rose is passionate, mysterious, and undeniably luxurious. The perfect companion for an unforgettable evening.',
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800',
    ingredients: 'Damask Rose, Black Currant, Madagascar Vanilla, Musk.',
  };

  return (
    <div className="bg-[#fafafa] min-h-screen text-neutral-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:px-12">
        
        {/* Breadcrumb equivalent */}
        <div className="mb-12 text-xs uppercase tracking-widest text-neutral-400 font-bold">
          <span>Home</span> <span className="mx-2 text-[#FFD1DC]">—</span> 
          <span>Shop</span> <span className="mx-2 text-[#FFD1DC]">—</span> 
          <span className="text-[#000000]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Product Image Section */}
          <div className="relative rounded-3xl overflow-hidden bg-white p-6 shadow-sm border border-[#000000]/5 flex items-center justify-center group">
            <div className="absolute top-6 right-6 z-20 bg-[#fafafa] p-3 rounded-full shadow-sm cursor-pointer hover:bg-[#FFD1DC] hover:text-[#000000] transition-all text-neutral-400">
              <Heart size={20} />
            </div>
            <img src={product.image} alt={product.name} className="w-full max-w-md h-auto object-contain group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" />
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-center">
            <div className="flex gap-2 mb-4">
              <span className="bg-[#FFD1DC]/30 text-[#000000] px-3 py-1 rounded-sm text-xs uppercase tracking-widest font-bold">{product.family}</span>
              <span className="bg-white border border-[#000000]/10 text-neutral-500 px-3 py-1 rounded-sm text-xs uppercase font-bold">{product.concentration}</span>
            </div>
            
            <h1 className="text-5xl font-elegant text-[#000000] mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-[#FFD1DC] drop-shadow-sm">
                {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
              </div>
              <span className="text-neutral-500 text-sm font-medium underline underline-offset-4 cursor-pointer hover:text-[#000000]">128 Reviews</span>
            </div>

            <p className="text-3xl font-semibold text-[#000000] mb-8">${product.price.toFixed(2)}</p>

            <p className="text-neutral-600 font-light leading-relaxed mb-10 text-lg">
              {product.description}
            </p>

            <div className="mb-12 space-y-6">
              <div className="flex items-center border-b border-[#000000]/5 pb-4">
                <span className="w-32 text-neutral-400 uppercase tracking-widest text-xs font-bold">Volume</span>
                <span className="text-[#000000] font-medium">{product.volume}</span>
              </div>
              <div className="flex items-start border-b border-[#000000]/5 pb-4">
                <span className="w-32 text-neutral-400 uppercase tracking-widest text-xs font-bold pt-1">Key Notes</span>
                <span className="text-[#000000] flex-1 leading-relaxed">{product.ingredients}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 mb-12">
              <div className="flex items-center border border-[#000000]/20 rounded-full px-6 py-4 bg-white">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-neutral-400 hover:text-[#000000] transition-colors">-</button>
                <span className="mx-8 text-[#000000] font-bold">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="text-neutral-400 hover:text-[#000000] transition-colors">+</button>
              </div>
              
              <button className="flex-1 w-full flex items-center justify-center gap-3 bg-[#000000] text-white py-4 px-8 rounded-full font-bold uppercase tracking-widest hover:bg-[#FFD1DC] hover:text-[#000000] transition-all transform hover:-translate-y-1 shadow-lg">
                <ShoppingBag size={20} /> Add to Bag
              </button>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#000000]/10">
              <div className="flex items-center gap-4 text-neutral-600">
                <div className="bg-[#FFD1DC]/20 p-3 rounded-full text-[#000000]">
                  <Truck size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-[#000000]">Free Shipping</h5>
                  <span className="text-xs font-light">On all orders</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-neutral-600">
                <div className="bg-[#FFD1DC]/20 p-3 rounded-full text-[#000000]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-[#000000]">Guaranteed</h5>
                  <span className="text-xs font-light">100% Authentic</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
