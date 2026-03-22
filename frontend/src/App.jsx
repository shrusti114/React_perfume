import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AdminDashboard from './components/admin/AdminDashboard';
import SellerDashboard from './components/seller/SellerDashboard';
import UserDashboard from './components/user/UserDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Shop from './pages/Shop';
import Explore from './pages/Explore';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import VerifyEmail from './pages/VerifyEmail';
import { ArrowRight, Star, ShoppingBag, Truck, ShieldCheck, Droplet } from 'lucide-react';
import './App.css';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  if (!token) return <Navigate to="/login" replace />;
  if (role && userRole !== role) return <Navigate to="/login" replace />;
  return children;
};

const featuredProducts = [
  { id: 1, name: 'Velvet Oud', price: '$210.00', category: 'Woody', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=600' },
  { id: 2, name: 'Midnight Rose', price: '$185.00', category: 'Floral', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=600' },
  { id: 3, name: 'Crystal Ocean', price: '$150.00', category: 'Fresh', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?q=80&w=600' },
  { id: 4, name: 'Amber Spice', price: '$195.00', category: 'Oriental', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?q=80&w=600' },
];

const Home = () => (
  <div className="bg-[#fafafa] text-neutral-800 min-h-screen font-sans selection:bg-[#FFD1DC] selection:text-[#000000]">
    
    {/* Hero Section */}
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1616401784845-180882ba9ba8?q=80&w=2000" alt="Westion Premium Perfume" className="w-full h-full object-cover object-center opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fafafa] via-white/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-12 pt-20">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#000000]/10 bg-white/70 backdrop-blur-md mb-8 text-[#000000] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Star size={14} className="text-[#FFD1DC] fill-current" /> Westion Signature Collection
          </div>
          
          <h1 className="text-5xl md:text-7xl font-elegant text-[#000000] mb-6 leading-tight">
            The Essence of <br /><span className="text-[#FFD1DC] font-cursive text-7xl md:text-8xl drop-shadow-sm">Luxury</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 mb-10 leading-relaxed font-light max-w-xl">
            Discover our curated collection of premium fragrances. Crafted for elegance, designed to leave an unforgettable impression.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/shop" className="bg-[#000000] text-white px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#FFD1DC] hover:text-[#000000] hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link to="/about" className="border border-[#000000]/20 hover:border-[#000000] text-[#000000] bg-white/50 backdrop-blur-sm px-10 py-4 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#000000] hover:text-white transition-all flex items-center justify-center">
              Our Story
            </Link>
          </div>
        </div>
      </div>
    </section>

    {/* Featured Perfumes */}
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h4 className="text-[#000000] font-bold text-sm uppercase tracking-widest mb-2 flex items-center gap-2"><div className="w-8 h-px bg-[#FFD1DC]"></div> Editor's Choice</h4>
          <h2 className="text-4xl font-elegant text-[#000000]">Featured Fragrances</h2>
        </div>
        <Link to="/shop" className="hidden sm:flex items-center gap-2 text-[#000000] hover:text-[#FFD1DC] transition-colors text-sm uppercase tracking-widest font-bold">
          View All <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredProducts.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id} className="group relative bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#000000]/5 flex flex-col">
            <div className="h-80 overflow-hidden relative bg-[#fafafa]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 mix-blend-multiply opacity-90 group-hover:opacity-100" />
            </div>
            
            <div className="p-6 relative z-20 flex-grow flex flex-col justify-end bg-white">
              <div className="text-[10px] text-[#000000] border border-[#000000]/10 px-2 py-0.5 rounded uppercase tracking-widest font-bold mb-3 w-max bg-[#fafafa]">{product.category}</div>
              <h3 className="text-2xl font-elegant text-[#000000] mb-2">{product.name}</h3>
              <div className="flex items-center justify-between mt-auto pt-4">
                <span className="text-lg font-semibold text-[#000000]">{product.price}</span>
                <button className="h-10 w-10 bg-[#fafafa] border border-[#000000]/5 hover:bg-[#FFD1DC] hover:text-[#000000] text-neutral-600 rounded-full flex items-center justify-center transition-all">
                  <ShoppingBag size={18} />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>

    {/* Footer */}
    <footer className="bg-white pt-24 pb-12 border-t border-[#000000]/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-3xl font-cursive font-bold text-[#000000] mb-6 inline-flex items-center gap-2 hover:text-[#FFD1DC] transition-colors">
            <Droplet size={24} className="text-[#FFD1DC]" /> Westion
          </Link>
          <p className="text-neutral-500 max-w-sm leading-relaxed mb-6 font-light">
            Elevating everyday moments with exquisite fragrances. Discover your signature scent with us.
          </p>
        </div>
        <div>
          <h4 className="text-[#000000] font-bold uppercase tracking-widest text-sm mb-6">Collections</h4>
          <ul className="space-y-4 text-neutral-500 font-medium text-sm">
            <li><Link to="/shop" className="hover:text-[#FFD1DC] transition-colors">Floral Series</Link></li>
            <li><Link to="/shop" className="hover:text-[#FFD1DC] transition-colors">Woody Notes</Link></li>
            <li><Link to="/shop" className="hover:text-[#FFD1DC] transition-colors">Fresh Citrus</Link></li>
            <li><Link to="/shop" className="hover:text-[#FFD1DC] transition-colors">Oriental Spice</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-[#000000] font-bold uppercase tracking-widest text-sm mb-6">Client Care</h4>
          <ul className="space-y-4 text-neutral-500 font-medium text-sm">
            <li><Link to="/contact" className="hover:text-[#FFD1DC] transition-colors">Contact Us</Link></li>
            <li><Link to="/about" className="hover:text-[#FFD1DC] transition-colors">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-[#FFD1DC] transition-colors">FAQ</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 border-t border-[#000000]/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 uppercase tracking-widest font-bold">
        <p>&copy; 2026 Westion. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-[#FFD1DC] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[#FFD1DC] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen selection:bg-[#FFD1DC] selection:text-[#000000]">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email/:token" element={<VerifyEmail />} />
            <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/seller-dashboard" element={<ProtectedRoute role="seller"><SellerDashboard /></ProtectedRoute>} />
            <Route path="/user-dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
