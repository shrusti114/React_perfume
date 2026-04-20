import React, { useState, useEffect } from 'react';
import { User as UserIcon, Mail, Phone, Store, CheckCircle, Save, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';

const UserDashboard = () => {
  const { user: authUser, refreshProfile } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [error, setError] = useState('');

  // Fetch profile from backend on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await authService.getProfile();
        setUser(profile);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    setSaveSuccess(false);
    
    try {
      const updated = await authService.updateProfile({
        name: user.name,
        email: user.email,
        phone: user.phone,
        shopName: user.shopName,
        bio: user.bio,
        address: user.address,
      });
      setUser(updated);
      await refreshProfile(); // update auth context too
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-neutral-50 dark:bg-black min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 size={32} className="text-[#f8c8dc] animate-spin" />
          <span className="text-neutral-500 text-xs uppercase tracking-widest font-bold">Loading Profile</span>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="bg-neutral-50 dark:bg-black min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center px-6">
          <AlertCircle size={32} className="text-red-400" />
          <p className="text-red-400 text-sm font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-neutral-50 dark:bg-black min-h-screen text-neutral-800 font-sans py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-elegant text-black dark:text-white mb-4">Profile Management</h1>
          <p className="text-neutral-500 font-light text-lg">Manage your personal information, contact details, and account status.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Status Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-white/5 p-8 rounded-3xl border border-black/5 dark:border-white/10 shadow-sm sticky top-28">
              <div className="h-24 w-24 bg-[#FFD1DC] dark:bg-[#f8c8dc]/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                <UserIcon size={40} className="text-white dark:text-[#f8c8dc]" />
              </div>
              <h3 className="text-2xl font-elegant text-center text-black dark:text-white mb-2">{user?.name}</h3>
              <p className="text-center text-xs uppercase tracking-widest font-bold text-neutral-400 mb-2">{user?.role}</p>
              <p className="text-center text-xs text-neutral-500 mb-8">{user?.email}</p>

              <div className="border-t border-black/10 dark:border-white/20 pt-6 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-500 font-semibold uppercase tracking-widest text-[10px]">Email Verified</span>
                  {user?.isEmailVerified ? (
                    <span className="flex items-center gap-1 text-green-600 font-bold bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded"><CheckCircle size={14}/> Verified</span>
                  ) : (
                    <span className="text-amber-600 font-bold bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded">Pending</span>
                  )}
                </div>
                {user?.role === 'seller' && (
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-neutral-500 font-semibold uppercase tracking-widest text-[10px]">Admin Approval</span>
                    {user?.isVerified ? (
                      <span className="flex items-center gap-1 text-green-600 font-bold bg-green-50 dark:bg-green-500/10 px-2 py-1 rounded"><CheckCircle size={14}/> Approved</span>
                    ) : (
                      <span className="text-amber-600 font-bold bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded">Pending</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="md:col-span-2 bg-white dark:bg-white/5 p-8 md:p-12 rounded-[2rem] border border-black/5 dark:border-white/10 shadow-sm">
            <h3 className="text-2xl font-elegant text-black dark:text-white mb-8">Edit Details</h3>
            
            {saveSuccess && (
              <div className="bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20 p-4 rounded-xl mb-8 flex items-center gap-3">
                <CheckCircle size={20} /> Profile updated successfully!
              </div>
            )}

            {error && user && (
              <div className="bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20 p-4 rounded-xl mb-8 flex items-center gap-3">
                <AlertCircle size={20} /> {error}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                      <UserIcon size={18} />
                    </div>
                    <input type="text" name="name" value={user?.name || ''} onChange={handleChange} className="w-full bg-neutral-50 dark:bg-black border border-black/10 dark:border-white/20 pl-11 pr-4 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc]/30 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                      <Mail size={18} />
                    </div>
                    <input type="email" name="email" value={user?.email || ''} onChange={handleChange} className="w-full bg-neutral-50 dark:bg-black border border-black/10 dark:border-white/20 pl-11 pr-4 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc]/30 transition-colors" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                    <Phone size={18} />
                  </div>
                  <input type="text" name="phone" value={user?.phone || ''} onChange={handleChange} placeholder="Add your phone number" className="w-full bg-neutral-50 dark:bg-black border border-black/10 dark:border-white/20 pl-11 pr-4 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc]/30 transition-colors" />
                </div>
              </div>

              {user?.role === 'seller' && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Boutique / Shop Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                      <Store size={18} />
                    </div>
                    <input type="text" name="shopName" value={user?.shopName || ''} onChange={handleChange} placeholder="Your storefront name" className="w-full bg-neutral-50 dark:bg-black border border-black/10 dark:border-white/20 pl-11 pr-4 py-4 rounded-2xl text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc]/30 transition-colors" />
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-black/5 dark:border-white/10 mt-8">
                <button type="submit" disabled={isSaving} className="flex items-center justify-center gap-2 bg-black dark:bg-[#f8c8dc] text-white dark:text-black px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#f8c8dc] hover:text-black dark:hover:bg-white transition-all transform hover:-translate-y-1 shadow-md disabled:opacity-60 disabled:cursor-not-allowed">
                  {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
