import React, { useRef } from 'react';
import { User, Mail, Shield, Save, UserPlus, Calendar, MapPin, Image as ImageIcon, Users, Phone, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProfileDetails({ profile, onUpdate, isUpdating }) {
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: profile?.name || '',
    username: profile?.username || '',
    email: profile?.email || '',
    phone: profile?.phone || '',
    gender: profile?.gender || '',
    dob: profile?.dob ? new Date(profile.dob).toISOString().split('T')[0] : '',
    address: profile?.address || '',
    profileImage: profile?.profileImage || '',
  });

  const [previewImage, setPreviewImage] = React.useState(profile?.profileImage || '');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-12">
      {/* Header with Edit Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-black/5 dark:border-white/5 pb-8">
        <div>
          <h2 className="text-3xl font-serif text-black dark:text-white mb-2">Profile Details</h2>
          <p className="text-neutral-500 text-[10px] uppercase tracking-[0.3em] font-bold">Manage your personal account settings</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all text-[10px] font-bold uppercase tracking-widest shadow-sm ${
              isEditing 
                ? 'bg-black text-white dark:bg-[#f8c8dc] dark:text-black border-transparent scale-105' 
                : 'bg-white dark:bg-white/5 border-black/5 dark:border-white/10 text-neutral-500 dark:text-white hover:bg-neutral-50 shadow-inner'
            }`}
          >
            <span>✏️</span> {isEditing ? 'Discard Changes' : 'Edit Profile'}
          </button>
          <div className="px-6 py-3 rounded-full bg-neutral-100 dark:bg-white/5 border border-black/5 flex items-center gap-2">
            <Shield size={14} className="text-[#f8c8dc]" />
            <span className="text-[9px] uppercase tracking-widest font-bold text-neutral-500">Secure Access</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Avatar Picker Section */}
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative group">
            <motion.div 
              whileHover={isEditing ? { scale: 1.05 } : {}}
              className={`w-32 h-32 rounded-full overflow-hidden border-4 ${isEditing ? 'border-[#f8c8dc] cursor-pointer shadow-xl' : 'border-black/5 dark:border-white/10'} p-1 bg-gradient-to-tr from-[#f8c8dc] to-transparent transition-all`}
              onClick={() => isEditing && fileInputRef.current.click()}
            >
              <img 
                src={previewImage || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200'} 
                className="w-full h-full object-cover rounded-full" 
                alt="Profile Preview"
              />
              
              {isEditing && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                  <Camera size={24} className="text-white" />
                </div>
              )}
            </motion.div>
            
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {isEditing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#f8c8dc] text-black text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg"
              >
                Change Portrait
              </motion.div>
            )}
          </div>
          <p className="text-neutral-500 text-[9px] uppercase tracking-widest font-bold">Visual Identity Verification</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 px-4 md:px-0">
          
          {/* Full Name */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-4">Full Name</label>
            <div className={`relative transition-all duration-300 ${!isEditing ? 'opacity-70' : ''}`}>
              <User size={18} className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? 'text-[#f8c8dc]' : 'text-neutral-400'}`} />
              <input
                type="text"
                name="name"
                readOnly={!isEditing}
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: John Doe"
                className={`w-full bg-neutral-50 dark:bg-black border rounded-3xl py-5 pl-16 pr-8 text-sm text-black dark:text-white transition-all ${
                  isEditing 
                    ? 'border-[#f8c8dc] ring-4 ring-[#f8c8dc]/5 bg-white dark:bg-neutral-900 shadow-xl' 
                    : 'border-transparent cursor-default'
                }`}
              />
            </div>
          </div>

          {/* Username */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-4">Username</label>
            <div className={`relative transition-all duration-300 ${!isEditing ? 'opacity-70' : ''}`}>
              <UserPlus size={18} className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? 'text-[#f8c8dc]' : 'text-neutral-400'}`} />
              <input
                type="text"
                name="username"
                readOnly={!isEditing}
                value={formData.username}
                onChange={handleChange}
                placeholder="@username"
                className={`w-full bg-neutral-50 dark:bg-black border rounded-3xl py-5 pl-16 pr-8 text-sm text-black dark:text-white transition-all ${
                  isEditing 
                    ? 'border-[#f8c8dc] ring-4 ring-[#f8c8dc]/5 bg-white dark:bg-neutral-900 shadow-xl' 
                    : 'border-transparent cursor-default'
                }`}
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-4">Email Address</label>
            <div className="relative opacity-40">
              <Mail size={18} className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="email"
                readOnly
                value={formData.email}
                className="w-full bg-neutral-50 dark:bg-black border border-transparent rounded-3xl py-5 pl-16 pr-8 text-sm text-black dark:text-white outline-none cursor-not-allowed"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-4">Phone Number</label>
            <div className={`relative transition-all duration-300 ${!isEditing ? 'opacity-70' : ''}`}>
              <Phone size={18} className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? 'text-[#f8c8dc]' : 'text-neutral-400'}`} />
              <input
                type="text"
                name="phone"
                readOnly={!isEditing}
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 234 567 89"
                className={`w-full bg-neutral-50 dark:bg-black border rounded-3xl py-5 pl-16 pr-8 text-sm text-black dark:text-white transition-all ${
                  isEditing 
                    ? 'border-[#f8c8dc] ring-4 ring-[#f8c8dc]/5 bg-white dark:bg-neutral-900 shadow-xl' 
                    : 'border-transparent cursor-default'
                }`}
              />
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-4">Gender</label>
            <div className={`relative transition-all duration-300 ${!isEditing ? 'opacity-70' : ''}`}>
              <Users size={18} className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? 'text-[#f8c8dc]' : 'text-neutral-400'}`} />
              <select
                name="gender"
                disabled={!isEditing}
                value={formData.gender}
                onChange={handleChange}
                className={`w-full bg-neutral-50 dark:bg-black border rounded-3xl py-5 pl-16 pr-12 text-sm text-black dark:text-white transition-all appearance-none cursor-pointer ${
                  isEditing 
                    ? 'border-[#f8c8dc] ring-4 ring-[#f8c8dc]/5 bg-white dark:bg-neutral-900 shadow-xl' 
                    : 'border-transparent cursor-default'
                }`}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Other</option>
                <option value="prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* DOB */}
          <div className="space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-4">Date of Birth</label>
            <div className={`relative transition-all duration-300 ${!isEditing ? 'opacity-70' : ''}`}>
              <Calendar size={18} className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? 'text-[#f8c8dc]' : 'text-neutral-400'}`} />
              <input
                type="date"
                name="dob"
                readOnly={!isEditing}
                value={formData.dob}
                onChange={handleChange}
                className={`w-full bg-neutral-50 dark:bg-black border rounded-3xl py-5 pl-16 pr-8 text-sm text-black dark:text-white transition-all ${
                  isEditing 
                    ? 'border-[#f8c8dc] ring-4 ring-[#f8c8dc]/5 bg-white dark:bg-neutral-900 shadow-xl' 
                    : 'border-transparent cursor-default'
                }`}
              />
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2 space-y-3">
            <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400 ml-4">Shipping Address</label>
            <div className={`relative transition-all duration-300 ${!isEditing ? 'opacity-70' : ''}`}>
              <MapPin size={18} className={`absolute left-6 top-6 transition-colors ${isEditing ? 'text-[#f8c8dc]' : 'text-neutral-400'}`} />
              <textarea
                name="address"
                readOnly={!isEditing}
                value={formData.address}
                onChange={handleChange}
                rows="3"
                placeholder="Enter your street address, city, and zip code"
                className={`w-full bg-neutral-50 dark:bg-black border rounded-[2rem] py-5 pl-16 pr-8 text-sm text-black dark:text-white transition-all resize-none ${
                  isEditing 
                    ? 'border-[#f8c8dc] ring-4 ring-[#f8c8dc]/5 bg-white dark:bg-neutral-900 shadow-xl' 
                    : 'border-transparent cursor-default'
                }`}
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-start pt-6 px-4 md:px-0">
            <button
              type="submit"
              disabled={isUpdating}
              className="bg-black dark:bg-[#f8c8dc] text-white dark:text-black px-16 py-5 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:opacity-90 transition-all transform hover:-translate-y-1.5 shadow-[0_20px_40px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_40px_rgba(248,200,220,0.1)] flex items-center gap-4 disabled:opacity-50 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              {isUpdating ? 'Saving...' : <><Save size={16} /> Save Changes</>}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
