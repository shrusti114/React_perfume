import React, { useState, useEffect } from 'react';
import { User as UserIcon, Mail, Phone, Store, CheckCircle, Save } from 'lucide-react';

const UserDashboard = () => {
  const [user, setUser] = useState({
    name: 'Shrusti',
    email: 'shrusti@gmail.com',
    phone: '123-456-7890',
    shopName: '',
    role: 'user',
    isVerified: true
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Note: Inside a complete app, we would use useEffect and Axios to fetch/put from /api/users/profile
  // The layout follows the client requirements for Profile Management.

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API Call to PUT /api/users/profile
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-[#fafafa] min-h-screen text-neutral-800 font-sans py-16 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-elegant text-[#000000] mb-4">Profile Management</h1>
          <p className="text-neutral-500 font-light text-lg">Manage your personal information, contact details, and account status.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Status Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-8 rounded-3xl border border-[#000000]/5 shadow-sm sticky top-28">
              <div className="h-24 w-24 bg-[#FFD1DC]/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                <UserIcon size={40} className="text-[#FFD1DC]" />
              </div>
              <h3 className="text-2xl font-elegant text-center text-[#000000] mb-2">{user.name}</h3>
              <p className="text-center text-xs uppercase tracking-widest font-bold text-neutral-400 mb-8">{user.role}</p>

              <div className="border-t border-[#000000]/10 pt-6">
                <div className="flex justify-between items-center text-sm mb-4">
                  <span className="text-neutral-500 font-semibold uppercase tracking-widest text-[10px]">Verification Status</span>
                  {user.isVerified ? (
                    <span className="flex items-center gap-1 text-green-600 font-bold bg-green-50 px-2 py-1 rounded"><CheckCircle size={14}/> Verified</span>
                  ) : (
                    <span className="text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded">Pending</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div className="md:col-span-2 bg-white p-8 md:p-12 rounded-[2rem] border border-[#000000]/5 shadow-sm">
            <h3 className="text-2xl font-elegant text-[#000000] mb-8">Edit Details</h3>
            
            {saveSuccess && (
              <div className="bg-green-50 text-green-700 border border-green-200 p-4 rounded-xl mb-8 flex items-center gap-3">
                <CheckCircle size={20} /> Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                      <UserIcon size={18} />
                    </div>
                    <input type="text" name="name" value={user.name} onChange={handleChange} className="w-full bg-[#fafafa] border border-[#000000]/10 pl-11 pr-4 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                      <Mail size={18} />
                    </div>
                    <input type="email" name="email" value={user.email} onChange={handleChange} className="w-full bg-[#fafafa] border border-[#000000]/10 pl-11 pr-4 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                    <Phone size={18} />
                  </div>
                  <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Add your phone number" className="w-full bg-[#fafafa] border border-[#000000]/10 pl-11 pr-4 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors" />
                </div>
              </div>

              {user.role === 'seller' && (
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Boutique / Shop Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                      <Store size={18} />
                    </div>
                    <input type="text" name="shopName" value={user.shopName} onChange={handleChange} placeholder="Your storefront name" className="w-full bg-[#fafafa] border border-[#000000]/10 pl-11 pr-4 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-colors" />
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-[#000000]/5 mt-8">
                <button type="submit" disabled={isSaving} className="flex items-center justify-center gap-2 bg-[#000000] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FFD1DC] hover:text-[#000000] transition-all transform hover:-translate-y-1 shadow-md">
                  <Save size={18} /> {isSaving ? 'Saving...' : 'Save Changes'}
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
