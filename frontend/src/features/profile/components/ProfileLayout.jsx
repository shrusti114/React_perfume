import React from 'react';
import { User, Package, MapPin, Heart, LogOut, Bell } from 'lucide-react';
import { Link } from '@tanstack/react-router';

export function ProfileLayout({ children, activeTab, profile }) {
  const menuItems = [
    { id: 'details', label: 'My Details', icon: User, path: '/user/profile' },
    { id: 'orders', label: 'Order History', icon: Package, path: '/user/profile?tab=orders' },
    { id: 'addresses', label: 'Address Book', icon: MapPin, path: '/user/profile?tab=addresses' },
    { id: 'wishlist', label: 'My Wishlist', icon: Heart, path: '/user/wishlist' },
    { id: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications' },
  ];

  const enrollmentDate = profile?.created_at ? new Date(profile.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recent';

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen pt-32 pb-24 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12 px-4">
          <h1 className="text-5xl font-serif text-black dark:text-white">Account</h1>
          <Link 
            to="/" 
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white dark:bg-white/5 border border-black/5 hover:bg-black hover:text-white dark:hover:bg-[#f8c8dc] dark:hover:text-black transition-all text-neutral-600 dark:text-white text-xs font-bold uppercase tracking-widest shadow-sm"
          >
            <span>🔙</span> Back to Home
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Membership Header */}
            <div className="bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] p-8 border border-black/5 dark:border-white/5 shadow-sm text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-6 border-4 border-[#f8c8dc]/20 p-1 bg-gradient-to-tr from-[#f8c8dc] to-transparent">
                <img 
                  src={profile?.profileImage || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200'} 
                  className="w-full h-full object-cover rounded-full" 
                  alt="Profile"
                />
              </div>
              <h3 className="text-lg font-bold text-black dark:text-white mb-1">{profile?.name || 'Anonymous User'}</h3>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-6 italic">
                {profile?.username ? `@${profile.username}` : `@${(profile?.name || 'user').toLowerCase().replace(/\s/g, '_')}`}
              </p>
              
              <div className="pt-6 border-t border-black/5 dark:border-white/5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">Role</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#d4af37]">{profile?.role || 'User'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-400">Joined</span>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-black dark:text-white">{enrollmentDate}</span>
                </div>
              </div>
            </div>

            {/* Menu */}
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all group ${
                    activeTab === item.id 
                      ? 'bg-black dark:bg-[#f8c8dc] text-white dark:text-black shadow-lg translate-x-1 outline-none' 
                      : 'text-neutral-500 hover:bg-white dark:hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <item.icon size={18} className={activeTab === item.id ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'} />
                  <span className="text-[10px] uppercase tracking-widest font-bold">{item.label}</span>
                </Link>
              ))}
              
              <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all mt-4 group border border-transparent hover:border-red-500/10">
                <LogOut size={18} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Sign Out</span>
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white dark:bg-[#0a0a0a] rounded-[3rem] border border-black/5 dark:border-white/10 shadow-sm p-8 md:p-12">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
