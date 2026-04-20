import React from 'react';
import { Link } from '@tanstack/react-router';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import velvoraLogo from "../../../assets/velvora_logo.png";

const Footer = ({ brandsCount, productsCount }) => {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-black/10 dark:border-white/5 font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-6 hover:opacity-80 transition-opacity">
              <img src={velvoraLogo} alt="Velvora" className="h-10 w-10 object-contain rounded-full bg-white p-1" />
              <span className="text-xl font-serif font-bold text-white tracking-widest">VELVORA</span>
            </Link>
            <p className="text-neutral-400 max-w-sm leading-relaxed mb-8 font-light text-sm">
              The world's most curated perfume destination. {brandsCount} brands. {productsCount?.toLocaleString()} fragrances. One extraordinary experience.
            </p>
            <div className="flex gap-4">
              {[
                { icon: <Instagram size={18} />, href: '#' },
                { icon: <Twitter size={18} />, href: '#' },
                { icon: <Facebook size={18} />, href: '#' },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center text-neutral-400 hover:border-white hover:text-white dark:hover:border-[#f8c8dc]/50 dark:hover:text-[#f8c8dc] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Explore</h4>
            <ul className="space-y-4 text-neutral-500 text-sm">
              {['Floral', 'Woody', 'Fresh', 'Oriental'].map((cat) => (
                <li key={cat}>
                  <Link to="/shop" className="hover:text-[#f8c8dc] transition-colors">{cat}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Client Care</h4>
            <ul className="space-y-4 text-neutral-500 text-sm">
              {[
                { label: 'Contact Us', to: '/contact' },
                { label: 'Our Story', to: '/about' },
                { label: 'FAQ', to: '/contact' },
                { label: 'Order Tracking', to: '/track-order' },
                { label: 'Returns', to: '/contact' },
              ].map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="hover:text-[#f8c8dc] transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-600 uppercase tracking-widest font-bold">
          <p>© 2026 Velvora. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#f8c8dc] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#f8c8dc] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
