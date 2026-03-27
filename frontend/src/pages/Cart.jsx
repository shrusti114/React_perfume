import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  // Dummy data matching styling rules
  const [cartItems, setCartItems] = useState([
    { _id: '1', name: 'Velvet Oud', price: 210, volume: '100ml', quantity: 1, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=200' },
    { _id: '2', name: 'Midnight Rose', price: 185, volume: '50ml', quantity: 2, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=200' },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item._id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const removeItem = (id) => setCartItems(cartItems.filter(item => item._id !== id));
  
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 25; // Flat rate
  const total = subtotal + shipping;

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen text-neutral-800 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-24 lg:px-12">
        <div className="flex items-center gap-4 mb-16">
          <h1 className="text-5xl font-elegant text-black dark:text-white">Shopping Bag</h1>
          <div className="bg-[#FFD1DC] dark:bg-[#f8c8dc] text-black dark:text-white h-10 w-10 rounded-full flex items-center justify-center font-bold text-lg">{cartItems.length}</div>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2rem] border border-black/5 dark:border-white/10 shadow-sm">
            <ShoppingBag size={64} className="text-[#FFD1DC] dark:text-[#f8c8dc] mx-auto mb-6" />
            <h2 className="text-3xl font-elegant text-black dark:text-white mb-4">Your bag is empty</h2>
            <p className="text-neutral-500 font-light mb-8">Discover our exquisite collections to find your signature scent.</p>
            <Link to="/shop" className="inline-flex items-center gap-2 bg-black dark:bg-white/10 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FFD1DC] dark:bg-[#f8c8dc] dark:hover:bg-[#f8c8dc] hover:text-black dark:text-white transition-colors">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {cartItems.map((item) => (
                <div key={item._id} className="flex flex-col sm:flex-row gap-8 bg-white p-6 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm items-center relative group">
                  <div className="h-32 w-32 shrink-0 bg-neutral-50 dark:bg-black rounded-2xl overflow-hidden relative border border-black/5 dark:border-white/10">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 mix-blend-multiply" />
                  </div>
                  
                  <div className="flex-1 w-full relative">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-2xl font-elegant text-black dark:text-white">{item.name}</h3>
                        <p className="text-xs text-neutral-400 font-medium uppercase tracking-widest mt-1">{item.volume}</p>
                      </div>
                      <p className="text-xl font-bold text-black dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                      <div className="flex items-center border border-black/10 dark:border-white/20 rounded-full px-4 py-2 bg-neutral-50 dark:bg-black">
                        <button onClick={() => updateQuantity(item._id, -1)} className="text-neutral-400 hover:text-black dark:text-white transition-colors">-</button>
                        <span className="mx-6 text-black dark:text-white font-bold text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item._id, 1)} className="text-neutral-400 hover:text-black dark:text-white transition-colors">+</button>
                      </div>
                      
                      <button onClick={() => removeItem(item._id)} className="text-neutral-400 hover:text-red-500 transition-colors flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm sticky top-28">
                <h3 className="text-xl font-bold uppercase tracking-widest text-black dark:text-white mb-8 pb-4 border-b border-black/10 dark:border-white/20">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-medium text-black dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span className="font-medium text-black dark:text-white">${shipping.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end border-t border-black/10 dark:border-white/20 pt-6 mb-8">
                  <span className="text-neutral-500 uppercase tracking-widest text-xs font-bold">Total</span>
                  <span className="text-4xl font-elegant text-black dark:text-white">${total.toFixed(2)}</span>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full flex items-center justify-center gap-2 bg-black dark:bg-white/10 text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#FFD1DC] dark:bg-[#f8c8dc] dark:hover:bg-[#f8c8dc] hover:text-black dark:text-white transition-all transform hover:-translate-y-1 shadow-md mb-4"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
                <div className="flex items-center justify-center gap-2 text-xs text-neutral-400">
                  <ShieldCheck size={14} /> Secure & Encrypted Checkout
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
