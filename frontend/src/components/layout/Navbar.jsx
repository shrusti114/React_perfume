import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, Menu, X, Sun, Moon } from 'lucide-react';
import velvoraLogo from '../../assets/velvora_logo.png';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = localStorage.getItem('role');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // If you want to check system preference initially, you could do it here
    return document.documentElement.classList.contains('dark');
  });

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
      localStorage.setItem('theme', 'dark');
    }
  };

  // Sync initial theme on mount
  React.useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    setIsMobileMenuOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Editorial', path: '/editorial' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-black/95 backdrop-blur-xl border-b border-black/5 dark:border-[#f8c8dc]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <img src={velvoraLogo} alt="Velvora" className="h-12 w-12 object-contain rounded-full" />
              <span className="text-2xl font-serif font-bold text-black dark:text-white tracking-widest transition-colors duration-300">VELVORA</span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs uppercase tracking-widest font-semibold transition-all duration-300 relative group ${
                  location.pathname === link.path
                    ? 'text-black dark:text-[#f8c8dc]'
                    : 'text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-[#f8c8dc]'
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-px bg-black dark:bg-[#f8c8dc] transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-[#f8c8dc] transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/5"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            {!role ? (
              <>
                <Link
                  to="/login"
                  className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-[#f8c8dc] px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-black text-white dark:bg-[#f8c8dc] dark:text-black px-5 py-2.5 text-xs uppercase tracking-wider font-bold rounded-full hover:bg-neutral-800 dark:hover:bg-white transition-all duration-300"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-neutral-600 dark:text-neutral-300 font-semibold flex items-center gap-2 text-xs uppercase tracking-widest transition-colors duration-300">
                  <User size={16} className="text-black dark:text-[#f8c8dc]" /> {role}
                </span>
                <button
                  onClick={logout}
                  className="text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-[#f8c8dc] px-3 py-2 text-xs uppercase tracking-wider font-semibold transition-colors duration-300"
                >
                  Logout
                </button>
              </div>
            )}
            <Link to="/cart" className="text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-[#f8c8dc] transition-colors p-2 relative group">
              <div className="absolute inset-0 bg-black/5 dark:bg-[#f8c8dc]/10 rounded-full scale-0 group-hover:scale-100 transition-transform" />
              <ShoppingBag size={20} className="relative z-10" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <button 
              onClick={toggleTheme} 
              className="p-2 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-[#f8c8dc] transition-colors rounded-full"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <Link to="/cart" className="p-2 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-[#f8c8dc] transition-colors">
              <ShoppingBag size={20} />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-[#f8c8dc] transition-colors"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/98 dark:bg-black/98 backdrop-blur-3xl border-b border-black/5 dark:border-[#f8c8dc]/10 py-8 px-6 flex flex-col space-y-6 shadow-2xl transition-colors duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={closeMenu}
              className={`text-base uppercase tracking-widest font-semibold transition-colors ${
                location.pathname === link.path ? 'text-black dark:text-[#f8c8dc]' : 'text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-[#f8c8dc]'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-black/5 dark:border-[#f8c8dc]/10" />
          {!role ? (
            <div className="flex flex-col space-y-4 pt-2">
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-center text-neutral-600 hover:text-black dark:text-neutral-300 dark:hover:text-[#f8c8dc] py-2 text-sm uppercase tracking-wider font-semibold transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="text-center bg-black text-white dark:bg-[#f8c8dc] dark:text-black hover:bg-neutral-800 dark:hover:bg-white py-3 rounded-full text-sm uppercase tracking-wider font-bold transition-colors"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col space-y-4 pt-2">
              <span className="text-neutral-600 dark:text-neutral-300 font-semibold flex items-center text-base gap-2 transition-colors">
                <User size={18} className="text-black dark:text-[#f8c8dc]" /> {role}
              </span>
              <button
                onClick={logout}
                className="text-left text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-[#f8c8dc] font-semibold text-sm uppercase tracking-wider transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
