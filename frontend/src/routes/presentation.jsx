import React, { useState, useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, ChevronRight, Play, Pause, 
    Sparkles, ShieldCheck, Database, Zap, 
    Layers, Cpu, PieChart, Globe, Mail, Phone
} from 'lucide-react';

export const Route = createFileRoute('/presentation')({
  component: Presentation,
});

const THEME = {
  black: '#0F0F0F',
  gold: '#D4AF37',
  white: '#FFFFFF',
  purple: '#2C003E',
  rose: '#B76E79',
};

function Presentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const slides = [
    {
      id: 1,
      type: 'title',
      title: 'Velvora',
      subtitle: 'Luxury Online Perfume Store',
      desc: 'A Modern Web-Based Fragrance Shopping System',
      details: [
        { label: 'Presented By', value: 'Velvora Team' },
        { label: 'Project Guide', value: 'Technical Lead' },
        { label: 'Institution', value: 'Engineering College' },
        { label: 'Cycle', value: '2025-2026' }
      ],
      bg: '/presentation_hero.png'
    },
    {
      id: 2,
      type: 'index',
      title: 'Strategic Index',
      items: [
        '01 Introduction', '02 About the Project', '03 Our Services', '04 Objectives', 
        '05 Scope', '06 Modules', '07 System Flow', '08 Data Flow (L0, L1, L2)', 
        '09 ER Diagram', '10 Data Dictionary', '11 SWOT Analysis (Pros/Cons)', 
        '12 Future Scope', '13 Conclusion'
      ]
    },
    {
      id: 3,
      type: 'content',
      title: 'Introduction',
      icon: <Sparkles className="text-gold" />,
      text: [
        'Velvora is a luxury online perfume store designed to transform traditional fragrance shopping into a modern digital experience.',
        'It allows users to browse, select, and purchase perfumes anytime, while providing sellers and administrators with powerful tools to manage products, orders, and customer data efficiently.'
      ]
    },
    {
      id: 4,
      type: 'content',
      title: 'About the Project',
      icon: <Layers className="text-gold" />,
      text: [
        'Velvora is a full-stack web application built using modern technologies like React.js, Node.js, and MongoDB.',
        'The system ensures secure authentication, real-time data updates, and a seamless shopping experience for users.'
      ]
    },
    {
      id: 5,
      type: 'grid',
      title: 'Our Signature Services',
      items: [
        { title: 'Luxury Discovery', desc: 'Online perfume browsing & filtering' },
        { title: 'Secure Vault', desc: 'User login & registration' },
        { title: 'Global Logistics', desc: 'Online ordering & tracking' },
        { title: 'Escrow Matrix', desc: 'Multiple secure payment options' },
        { title: 'Neural Feedback', desc: 'Rating & review system' },
        { title: 'Command Center', desc: 'Admin & Seller dashboards' }
      ]
    },
    {
      id: 6,
      type: 'objectives',
      title: 'Strategic Objectives',
      sections: [
        { 
          label: 'User Matrix', 
          icon: <Globe size={24}/>,
          items: ['Easy discovery', 'Secure payments', 'Real-time tracking'] 
        },
        { 
          label: 'Seller Axis', 
          icon: <Zap size={24}/>,
          items: ['Inventory control', 'Sales analytics', 'Order management'] 
        },
        { 
          label: 'Admin Apex', 
          icon: <ShieldCheck size={24}/>,
          items: ['User governance', 'Category control', 'System reports'] 
        }
      ]
    },
    {
      id: 7,
      type: 'content',
      title: 'Project Scope',
      icon: <PieChart size={24} className="text-gold"/>,
      text: [
        '24/7 online perfume shopping via high-availability nodes.',
        'Centralized database system for synchronized collection management.',
        'Secure JWT-based authentication protocols.',
        'Digital sequence tracking for international logisitics.',
        'Cloud-ready architecture for future scale and expansion.'
      ]
    },
    {
      id: 8,
      type: 'modules',
      title: 'Architecture Modules',
      modules: [
        { name: 'Admin Apex', details: 'User governance, seller approval, intelligence reports.' },
        { name: 'User Core', details: 'Discovery flow, checkout sequence, tracking link.' },
        { name: 'Seller Node', details: 'Inventory manifest, stock velocity, sales matrix.' }
      ]
    },
    {
      id: 85,
      type: 'content',
      title: 'Seller Dashboard UI Description',
      icon: <Layers size={24} className="text-gold"/>,
      text: [
        'The Seller Dashboard is designed with a clean and simple user interface that makes it easy for sellers to manage their activities. The layout includes a top navigation bar with profile and logout options, and a side menu with sections like Dashboard, Products, Orders, Inventory, and Reports.',
        'The main dashboard screen shows summary cards such as total products, total orders, sales amount, and low stock alerts. It also includes charts or graphs to display sales performance over time.',
        'Below this, sellers can view recent orders, notifications, and quick actions like adding a new product. The design uses minimal colors with clear sections, making it user-friendly and easy to navigate.'
      ]
    },
    {
      id: 86,
      type: 'modules',
      title: 'What a Seller Can Do',
      modules: [
        { name: 'Product Management', details: 'Add new perfumes, update details (price, description, images), and delete products.' },
        { name: 'Inventory & Orders', details: 'Track stock levels, update quantities, view customer orders, check status, and process orders.' },
        { name: 'Sales & Profile', details: 'Monitor total sales/revenue using reports, update personal/business details, and view customer feedback.' }
      ]
    },
    {
      id: 9,
      type: 'diagram',
      title: 'System Flow Sequence',
      svg: (
        <svg viewBox="0 0 800 200" className="w-full">
            <defs>
                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
                    <path d="M0,0 L0,6 L9,3 z" fill="#D4AF37" />
                </marker>
            </defs>
            <g fill="none" stroke="#D4AF37" strokeWidth="2">
                <rect x="10" y="70" width="100" height="60" rx="10" fill="#1A1A1A"/>
                <text x="60" y="105" textAnchor="middle" fill="white" fontSize="12">User Login</text>
                
                <path d="M110 100 L160 100" markerEnd="url(#arrow)" />
                
                <rect x="160" y="70" width="120" height="60" rx="10" fill="#1A1A1A"/>
                <text x="220" y="105" textAnchor="middle" fill="white" fontSize="12">Discovery Flow</text>

                <path d="M280 100 L330 100" markerEnd="url(#arrow)" />

                <rect x="330" y="70" width="100" height="60" rx="10" fill="#1A1A1A"/>
                <text x="380" y="105" textAnchor="middle" fill="white" fontSize="12">Cart Matrix</text>

                <path d="M430 100 L480 100" markerEnd="url(#arrow)" />

                <rect x="480" y="70" width="100" height="60" rx="10" fill="#1A1A1A"/>
                <text x="530" y="105" textAnchor="middle" fill="white" fontSize="12">Payment</text>

                <path d="M580 100 L630 100" markerEnd="url(#arrow)" />

                <rect x="630" y="70" width="120" height="60" rx="10" fill="#1A1A1A"/>
                <text x="690" y="105" textAnchor="middle" fill="white" fontSize="12">Success/Track</text>
            </g>
        </svg>
      )
    },
    {
      id: 10,
      type: 'diagram',
      title: 'DFD Level 0: Context',
      svg: (
        <svg viewBox="0 0 600 400" className="max-w-xl mx-auto">
            <circle cx="300" cy="200" r="80" fill="#1A1A1A" stroke="#D4AF37" strokeWidth="4" />
            <text x="300" y="205" textAnchor="middle" fill="#D4AF37" className="font-bold text-xl uppercase tracking-widest">Velvora</text>
            
            <rect x="50" y="160" width="100" height="80" fill="#111" stroke="#555" />
            <text x="100" y="205" textAnchor="middle" fill="white">USER</text>

            <rect x="450" y="50" width="100" height="80" fill="#111" stroke="#555" />
            <text x="500" y="95" textAnchor="middle" fill="white">ADMIN</text>

            <rect x="450" y="270" width="100" height="80" fill="#111" stroke="#555" />
            <text x="500" y="315" textAnchor="middle" fill="white">SELLER</text>

            <path d="M150 200 L220 200" stroke="#D4AF37" markerEnd="url(#arrow)" />
            <path d="M380 180 L450 120" stroke="#D4AF37" markerEnd="url(#arrow)" />
            <path d="M380 220 L450 280" stroke="#D4AF37" markerEnd="url(#arrow)" />
        </svg>
      )
    },
    {
      id: 11,
      type: 'diagram',
      title: 'DFD Level 1: Core Flow',
      svg: (
        <svg viewBox="0 0 600 400" className="max-w-2xl mx-auto">
            <g fill="#1A1A1A" stroke="#D4AF37">
                <rect x="250" y="20" width="100" height="50" rx="25" />
                <rect x="50" y="150" width="100" height="50" rx="25" />
                <rect x="250" y="150" width="100" height="50" rx="25" />
                <rect x="450" y="150" width="100" height="50" rx="25" />
                <rect x="250" y="300" width="100" height="50" rx="25" />
            </g>
            <g fill="white" fontSize="10" textAnchor="middle">
                <text x="300" y="50">1.0 AUTH</text>
                <text x="100" y="180">2.0 PRODUCT DISCOVERY</text>
                <text x="300" y="180">3.0 ORDER CHECKOUT</text>
                <text x="500" y="180">4.0 INVENTORY UPD</text>
                <text x="300" y="330">5.0 REPORT GEN</text>
            </g>
        </svg>
      )
    },
    {
      id: 12,
      type: 'content',
      title: 'DFD Level 2: Precision',
      icon: <Cpu size={24} className="text-gold"/>,
      text: [
        'Login Authentication Sequence: credential check -> token issue -> state update.',
        'Product Manifest Control: validation -> DB write -> CDN cache sync.',
        'Transaction Protocols: gateway lock -> ledger update -> notify dispatch.'
      ]
    },
    {
      id: 13,
      type: 'diagram',
      title: 'ER Diagram: Entity Relations',
      svg: (
        <svg viewBox="0 0 600 400" className="max-w-2xl mx-auto">
            <rect x="250" y="40" width="100" height="40" fill="#111" stroke="#D4AF37" />
            <text x="300" y="65" textAnchor="middle" fill="white" fontSize="12">USER</text>
            
            <rect x="250" y="180" width="100" height="40" fill="#111" stroke="#D4AF37" />
            <text x="300" y="205" textAnchor="middle" fill="white" fontSize="12">ORDER</text>

            <rect x="450" y="180" width="100" height="40" fill="#111" stroke="#D4AF37" />
            <text x="500" y="205" textAnchor="middle" fill="white" fontSize="12">PRODUCT</text>
            
            <rect x="50" y="180" width="100" height="40" fill="#111" stroke="#D4AF37" />
            <text x="100" y="205" textAnchor="middle" fill="white" fontSize="12">SELLER</text>

            <path d="M300 80 L300 180" stroke="#D4AF37" />
            <path d="M350 200 L450 200" stroke="#D4AF37" />
            <path d="M150 200 L250 200" stroke="#D4AF37" />
        </svg>
      )
    },
    {
      id: 14,
      type: 'dictionary',
      title: 'Data Dictionary Matrix',
      tables: [
        { name: 'Users', fields: ['user_id (UUID)', 'name (String)', 'email (Indexed)', 'role (Enum)'] },
        { name: 'Products', fields: ['prod_id (Hex)', 'name (Text)', 'price (Decimal)', 'stock (Int)'] },
        { name: 'Orders', fields: ['order_id (Seq)', 'user_ref', 'status (State)', 'ledger_ref'] }
      ]
    },
    {
      id: 15,
      type: 'content',
      title: 'Advantages: Neural Edge',
      icon: <Sparkles size={24} className="text-gold"/>,
      text: [
        '24/7 Global Availability across all timezones.',
        'High-density discovery matrix with advanced filtering.',
        'Secure Transaction Vault with encrypted payment flow.',
        'Real-time inventory synchronization for accurate stock levels.',
        'Efficient Seller Analytics for performance monitoring.'
      ]
    },
    {
      id: 16,
      type: 'content',
      title: 'Constraints & Limitations',
      icon: <Database size={24} className="text-rose"/>,
      text: [
        'Persistent Internet Connection is a prerequisite for entry.',
        'Infrastructure setup costs for high-scale luxury nodes.',
        'Security maintenance requirements for neural data protection.',
        'Physical logistics dependency for final delivery.'
      ]
    },
    {
      id: 17,
      type: 'content',
      title: 'Future Horizon Scope',
      icon: <Sparkles size={32} className="text-gold animate-pulse"/>,
      text: [
        'AI-based Personality-to-Scent recommendations.',
        'AR/VR Fragrance Visualization Experience.',
        'Blockchain-backed product authentication (Anti-Counterfeit).',
        'Neural-linked subscriptions for automated replenishment.'
      ]
    },
    {
      id: 18,
      type: 'content',
      title: 'Conclusion',
      icon: <ShieldCheck size={40} className="text-gold mb-6"/>,
      text: [
        'Velvora provides a modern, secure, and efficient platform for online perfume shopping.',
        'It improves the consumer discovery flow while simplifying the complex logistics of fragrance management for creators.'
      ]
    },
    {
      id: 19,
      type: 'contact',
      title: 'Connect with Velvora',
      details: [
        { icon: <Mail />, label: 'Neural Link', value: 'support@velvora.com' },
        { icon: <Phone />, label: 'Direct Access', value: '+91 999 000 1111' },
        { icon: <Globe />, label: 'Matrix Location', value: 'www.velvora.com' }
      ]
    },
    {
      id: 20,
      type: 'thankyou',
      title: 'The Essence of Discovery',
      msg: 'Velvora | Luxury Scents'
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(prev => prev + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(prev => prev - 1);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="fixed inset-0 bg-[#0F0F0F] text-white font-serif overflow-hidden select-none cursor-default presentation-mode" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/10 blur-[150px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          initial={{ opacity: 0, x: 20, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 1.02 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative h-full w-full flex flex-col items-center justify-center p-12 lg:p-24"
        >
            {/* Render Slide by Type */}
            {(() => {
                const s = slides[currentSlide];

                if (s.type === 'title') return (
                    <div className="flex flex-col items-center text-center max-w-5xl">
                        {s.bg && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 0.3, scale: 1 }}
                                transition={{ duration: 2 }}
                                className="absolute inset-0 z-0"
                            >
                                <img src={s.bg} alt="bg" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60"></div>
                            </motion.div>
                        )}
                        <motion.div 
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="relative z-10"
                        >
                            <h1 className="text-8xl lg:text-[10rem] font-bold tracking-tighter text-gold italic mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h1>
                            <p className="text-xl lg:text-3xl text-white/60 font-light tracking-[0.3em] uppercase mb-12">{s.subtitle}</p>
                            <div className="h-[1px] w-64 bg-gold/30 mx-auto mb-12"></div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-left">
                                {s.details.map((d, i) => (
                                    <div key={i}>
                                        <p className="text-[10px] text-gold uppercase tracking-widest font-bold mb-1">{d.label}</p>
                                        <p className="text-sm font-medium opacity-80">{d.value}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                );

                if (s.type === 'index') return (
                    <div className="w-full max-w-4xl">
                        <h2 className="text-5xl font-bold text-gold mb-16 tracking-tight text-center" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {s.items.map((it, i) => (
                                <motion.div 
                                    key={i} 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 + 0.5 }}
                                    className="p-4 border-l border-gold/20 hover:border-gold transition-colors text-sm font-light tracking-wide py-2"
                                >
                                    {it}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );

                if (s.type === 'content') return (
                    <div className="max-w-4xl flex flex-col items-center text-center">
                        <div className="h-20 w-20 flex items-center justify-center bg-gold/5 rounded-3xl mb-12 border border-gold/10">
                            {s.icon}
                        </div>
                        <h2 className="text-5xl font-bold text-gold mb-12" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h2>
                        <div className="space-y-8">
                            {s.text.map((t, i) => (
                                <motion.p 
                                    key={i} 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.2 + 0.5 }}
                                    className="text-lg lg:text-2xl font-light leading-relaxed opacity-80"
                                >
                                    {t}
                                </motion.p>
                            ))}
                        </div>
                    </div>
                );

                if (s.type === 'grid') return (
                    <div className="w-full max-w-6xl">
                         <h2 className="text-5xl font-bold text-gold mb-16 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h2>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {s.items.map((it, i) => (
                                <div key={i} className="p-10 bg-white/5 rounded-3xl border border-white/5 hover:border-gold/30 transition-all group">
                                    <h4 className="text-gold font-bold text-xl mb-4 group-hover:scale-105 transition-transform">{it.title}</h4>
                                    <p className="text-sm opacity-50 font-light">{it.desc}</p>
                                </div>
                            ))}
                         </div>
                    </div>
                );

                if (s.type === 'diagram' || (s.type === 'content' && s.svg)) return (
                    <div className="w-full max-w-5xl flex flex-col items-center">
                        <h2 className="text-4xl font-bold text-gold mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h2>
                        <div className="w-full p-12 bg-white/5 border border-white/5 rounded-[3rem] shadow-2xl">
                            {s.svg}
                        </div>
                    </div>
                );

                if (s.type === 'objectives') return (
                    <div className="w-full max-w-6xl">
                         <h2 className="text-5xl font-bold text-gold mb-16 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {s.sections.map((obj, i) => (
                                <div key={i} className="flex flex-col items-center text-center">
                                    <div className="h-16 w-16 bg-gold/5 border border-gold/10 rounded-full flex items-center justify-center text-gold mb-8">
                                        {obj.icon}
                                    </div>
                                    <h4 className="text-2xl font-bold text-white mb-8 italic" style={{ fontFamily: "'Playfair Display', serif" }}>{obj.label}</h4>
                                    <div className="space-y-4">
                                        {obj.items.map((it, idx) => (
                                            <p key={idx} className="text-sm opacity-60 font-medium uppercase tracking-widest">{it}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                );

                if (s.type === 'modules') return (
                    <div className="w-full max-w-5xl">
                         <h2 className="text-5xl font-bold text-gold mb-16" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h2>
                         <div className="space-y-8">
                             {s.modules.map((m, i) => (
                                 <div key={i} className="flex gap-12 items-start p-8 bg-white/5 rounded-3xl border-l-[6px] border-gold">
                                     <div className="text-gold font-black opacity-20 text-4xl">0{i+1}</div>
                                     <div>
                                         <h4 className="text-xl font-bold text-white mb-2 uppercase tracking-widest">{m.name}</h4>
                                         <p className="text-lg opacity-60 font-light">{m.details}</p>
                                     </div>
                                 </div>
                             ))}
                         </div>
                    </div>
                );

                if (s.type === 'dictionary') return (
                    <div className="w-full max-w-6xl">
                         <h2 className="text-5xl font-bold text-gold mb-16 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {s.tables.map((t, i) => (
                                <div key={i} className="bg-white/5 rounded-[2rem] p-10 border border-white/5">
                                    <h5 className="text-gold font-bold text-lg mb-8 uppercase tracking-widest border-b border-gold/20 pb-4">{t.name} Matrix</h5>
                                    <div className="space-y-4">
                                        {t.fields.map((f, idx) => (
                                            <p key={idx} className="text-[12px] opacity-60 font-mono italic">{f}</p>
                                        ))}
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                );

                if (s.type === 'contact') return (
                    <div className="max-w-4xl w-full">
                         <h2 className="text-5xl font-bold text-gold mb-20 text-center" style={{ fontFamily: "'Playfair Display', serif" }}>{s.title}</h2>
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                             {s.details.map((d, i) => (
                                 <div key={i} className="flex flex-col items-center text-center p-12 bg-white/5 rounded-[3rem] border border-white/5">
                                     <div className="text-gold mb-8 bg-gold/5 p-6 rounded-3xl">{d.icon}</div>
                                     <p className="text-[10px] uppercase font-bold text-gold tracking-widest mb-2">{d.label}</p>
                                     <p className="text-lg opacity-80">{d.value}</p>
                                 </div>
                             ))}
                         </div>
                    </div>
                );

                if (s.type === 'thankyou') return (
                    <div className="text-center font-elegant">
                        <motion.h2 
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5 }}
                            className="text-8xl lg:text-[12rem] font-bold text-gold italic mb-8"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            Thank You.
                        </motion.h2>
                        <p className="text-2xl font-light tracking-[0.5em] text-white/40 uppercase">{s.msg}</p>
                        <div className="mt-20 flex justify-center gap-4">
                            {[...Array(3)].map((_, i) => <div key={i} className="h-1.5 w-1.5 rounded-full bg-gold/20"></div>)}
                        </div>
                    </div>
                );

                return null;
            })()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Overlay */}
      <div className="absolute bottom-12 left-0 right-0 z-50 flex flex-col items-center gap-6">
          <div className="flex items-center gap-8 bg-black/40 backdrop-blur-xl px-10 py-5 rounded-full border border-white/5 shadow-2xl">
              <button 
                onClick={prevSlide} 
                disabled={currentSlide === 0}
                className="text-white hover:text-gold disabled:opacity-20 transition-all p-2 bg-white/5 rounded-full"
              >
                  <ChevronLeft size={24} />
              </button>
              
              <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gold w-8 text-right">0{currentSlide + 1}</span>
                  <div className="flex gap-1.5">
                      {slides.map((_, i) => (
                          <div 
                            key={i} 
                            onClick={() => setCurrentSlide(i)}
                            className={`h-1 cursor-pointer transition-all duration-500 rounded-full ${i === currentSlide ? 'w-8 bg-gold' : 'w-2 bg-white/10 hover:bg-white/30'}`}
                          ></div>
                      ))}
                  </div>
                  <span className="text-xs font-bold text-white/20 w-8">{slides.length}</span>
              </div>

              <button 
                onClick={nextSlide} 
                disabled={currentSlide === slides.length - 1}
                className="text-white hover:text-gold disabled:opacity-20 transition-all p-2 bg-white/5 rounded-full"
              >
                  <ChevronRight size={24} />
              </button>
          </div>
          
          <div className="flex items-center gap-6 text-[9px] font-black uppercase tracking-[0.3em] text-gold/30">
              <span>Velvora Presentation Matrix</span>
              <span className="flex items-center gap-2">
                  <div className="h-1 w-1 bg-gold/40 rounded-full"></div>
                  Neural Discovery Cycle
              </span>
          </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .presentation-mode {
            cursor: pointer;
        }
        @media print {
            .presentation-mode {
                background: white !important;
                color: black !important;
            }
        }
      `}} />
    </div>
  );
}

export default Presentation;
