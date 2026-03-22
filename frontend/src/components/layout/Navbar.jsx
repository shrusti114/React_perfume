import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Droplet, ShoppingBag, User, Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Explore', path: '/explore' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#fafafa]/90 backdrop-blur-xl border-b border-[#000000]/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={closeMenu} className="text-3xl font-cursive font-bold text-[#000000] hover:text-[#FFD1DC] transition-colors flex items-center gap-2">
              <Droplet size={24} className="text-[#FFD1DC]" /> Westion
            </Link>
          </div>
          
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-sm uppercase tracking-widest font-semibold transition-colors ${location.pathname === link.path ? 'text-[#FFD1DC]' : 'text-[#000000] hover:text-[#FFD1DC]'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {!role ? (
              <Link to="/login" className="text-[#000000] hover:text-[#FFD1DC] px-4 py-2 text-sm uppercase tracking-wider font-semibold transition">Login</Link>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-[#000000] font-semibold flex items-center gap-2"><User size={18} className="text-[#FFD1DC]" /> {role}</span>
                <button onClick={logout} className="text-[#000000] hover:text-[#FFD1DC] px-3 py-2 text-sm uppercase tracking-wider font-semibold transition">Logout</button>
              </div>
            )}
            <button className="text-[#000000] hover:text-[#FFD1DC] transition-colors p-2 relative group">
              <div className="absolute inset-0 bg-[#FFD1DC]/20 rounded-full scale-0 group-hover:scale-100 transition-transform"></div>
              <ShoppingBag size={22} className="relative z-10" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button className="text-[#000000] hover:text-[#FFD1DC] transition-colors">
              <ShoppingBag size={22} />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-[#000000] hover:text-[#FFD1DC] transition-colors">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#fafafa]/95 backdrop-blur-3xl border-b border-[#000000]/10 py-6 px-6 flex flex-col space-y-6 shadow-xl">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              onClick={closeMenu}
              className="text-lg uppercase tracking-widest font-semibold text-[#000000] hover:text-[#FFD1DC] transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-[#000000]/10" />
          {!role ? (
            <div className="flex flex-col space-y-4 pt-2">
              <Link to="/login" onClick={closeMenu} className="text-center text-[#000000] hover:bg-[#FFD1DC]/20 py-2 rounded-full text-sm uppercase tracking-wider font-semibold transition">Login</Link>
              <Link to="/register" onClick={closeMenu} className="text-center bg-[#000000] text-[#fafafa] hover:bg-[#FFD1DC] hover:text-[#000000] py-3 rounded-full text-sm uppercase tracking-wider font-bold transition-colors">Register</Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 pt-2">
              <span className="text-[#000000] font-semibold flex items-center text-lg gap-2"><User size={20} className="text-[#FFD1DC]"/> {role}</span>
              <button onClick={logout} className="text-left text-[#000000] hover:text-[#FFD1DC] font-semibold text-sm uppercase tracking-wider transition">Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
