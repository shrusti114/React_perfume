import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Phone, MapPin, FileText, Lock, Camera, CheckCircle, AlertCircle, Save, Sparkles } from 'lucide-react';

const ProfileSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().nullable(),
  shopName: Yup.string().nullable(),
  bio: Yup.string().max(500, 'Bio too long').nullable(),
  address: Yup.string().nullable(),
});

const PasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm your new password'),
});

const SellerProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleProfileSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put('http://localhost:5000/api/users/profile', values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(data);
      localStorage.setItem('userName', data.name);
      setMessage({ type: 'success', text: 'Profile updated flawlessly.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Update failed' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  const handlePasswordSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/users/change-password', {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage({ type: 'success', text: 'Security credentials updated.' });
      resetForm();
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Password change failed' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 5000);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12 pb-20">
      
      {message.text && (
        <div className={`fixed top-24 right-10 z-50 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-4 duration-300 ${message.type === 'success' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-rose-50 text-rose-600 border border-rose-100'}`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="text-sm font-bold uppercase tracking-widest">{message.text}</span>
        </div>
      )}

      {/* Profile Header */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-200 to-rose-200 opacity-20 blur-3xl rounded-[60px]"></div>
        <div className="relative bg-white/70 backdrop-blur-2xl rounded-[40px] p-10 border border-white/50 shadow-sm flex flex-col md:flex-row items-center gap-10">
          <div className="relative group/avatar">
            <div className="w-40 h-40 rounded-[40px] bg-neutral-100 overflow-hidden border-4 border-white shadow-xl flex items-center justify-center">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <User size={64} className="text-neutral-300" />
              )}
            </div>
            <button className="absolute -bottom-2 -right-2 w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-lg hover:bg-pink-500 transition-all transform hover:scale-110">
              <Camera size={20} />
            </button>
          </div>
          
          <div className="text-center md:text-left flex-grow">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <h2 className="text-4xl font-elegant text-neutral-800">{user?.name}</h2>
              {user?.isVerified && (
                <span className="bg-emerald-50 text-emerald-600 p-1.5 rounded-full" title="Verified Seller">
                  <CheckCircle size={16} fill="currentColor" className="text-white" />
                </span>
              )}
            </div>
            <p className="text-neutral-500 font-light text-lg mb-6">{user?.shopName || 'Independent Fragrance Seller'}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-400">ROLE: {user?.role}</span>
              <span className="px-4 py-2 bg-neutral-50 border border-neutral-100 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-400">ID: {user?._id}</span>
            </div>
          </div>

          <div className="bg-white/50 p-6 rounded-3xl border border-white/80 shadow-inner text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-2">Member Since</p>
            <p className="text-xl font-elegant text-neutral-800">{new Date(user?.createdAt).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white/70 backdrop-blur-xl rounded-[40px] p-10 border border-white/50 shadow-sm relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5">
               <Sparkles size={120} />
             </div>
             
             <h3 className="text-2xl font-elegant text-neutral-800 mb-10 flex items-center gap-4">
               <div className="w-1.5 h-8 bg-pink-400 rounded-full"></div> Professional Identity
             </h3>

             <Formik
               initialValues={{
                 name: user?.name || '',
                 email: user?.email || '',
                 phone: user?.phone || '',
                 shopName: user?.shopName || '',
                 bio: user?.bio || '',
                 address: user?.address || ''
               }}
               validationSchema={ProfileSchema}
               onSubmit={handleProfileSubmit}
             >
               {({ isSubmitting }) => (
                 <Form className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                       <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 px-1">Full Name</label>
                       <div className="relative group">
                         <User size={18} className="absolute left-5 top-5 text-neutral-300 group-focus-within:text-pink-400 transition-colors" />
                         <Field name="name" className="w-full bg-neutral-50/50 border border-neutral-100 pl-14 pr-6 py-5 rounded-[24px] focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-300 transition-all outline-none text-neutral-800" />
                       </div>
                       <ErrorMessage name="name" component="div" className="text-rose-500 text-[10px] font-bold uppercase ml-2" />
                     </div>

                     <div className="space-y-3">
                       <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 px-1">Email Essence</label>
                       <div className="relative group">
                         <Mail size={18} className="absolute left-5 top-5 text-neutral-300 group-focus-within:text-pink-400 transition-colors" />
                         <Field name="email" className="w-full bg-neutral-50/50 border border-neutral-100 pl-14 pr-6 py-5 rounded-[24px] focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-300 transition-all outline-none text-neutral-800" />
                       </div>
                       <ErrorMessage name="email" component="div" className="text-rose-500 text-[10px] font-bold uppercase ml-2" />
                     </div>

                     <div className="space-y-3">
                       <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 px-1">Contact Signal</label>
                       <div className="relative group">
                         <Phone size={18} className="absolute left-5 top-5 text-neutral-300 group-focus-within:text-pink-400 transition-colors" />
                         <Field name="phone" className="w-full bg-neutral-50/50 border border-neutral-100 pl-14 pr-6 py-5 rounded-[24px] focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-300 transition-all outline-none text-neutral-800" placeholder="+1 (555) 000-0000" />
                       </div>
                     </div>

                     <div className="space-y-3">
                       <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 px-1">Boutique Name</label>
                       <div className="relative group">
                         <Sparkles size={18} className="absolute left-5 top-5 text-neutral-300 group-focus-within:text-pink-400 transition-colors" />
                         <Field name="shopName" className="w-full bg-neutral-50/50 border border-neutral-100 pl-14 pr-6 py-5 rounded-[24px] focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-300 transition-all outline-none text-neutral-800" />
                       </div>
                     </div>

                     <div className="md:col-span-2 space-y-3">
                       <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 px-1">Base of Operations</label>
                       <div className="relative group">
                         <MapPin size={18} className="absolute left-5 top-5 text-neutral-300 group-focus-within:text-pink-400 transition-colors" />
                         <Field name="address" className="w-full bg-neutral-50/50 border border-neutral-100 pl-14 pr-6 py-5 rounded-[24px] focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-300 transition-all outline-none text-neutral-800" placeholder="Physical location or headquarters" />
                       </div>
                     </div>

                     <div className="md:col-span-2 space-y-3">
                       <label className="text-xs font-bold uppercase tracking-widest text-neutral-400 px-1">Artisan Biography</label>
                       <div className="relative group">
                         <FileText size={18} className="absolute left-5 top-5 text-neutral-300 group-focus-within:text-pink-400 transition-colors" />
                         <Field as="textarea" name="bio" rows="4" className="w-full bg-neutral-50/50 border border-neutral-100 pl-14 pr-6 py-5 rounded-[24px] focus:ring-2 focus:ring-pink-100 focus:bg-white focus:border-pink-300 transition-all outline-none text-neutral-800 resize-none" placeholder="Tell your customers about your passion for scents..." />
                       </div>
                       <ErrorMessage name="bio" component="div" className="text-rose-500 text-[10px] font-bold uppercase ml-2" />
                     </div>
                   </div>

                   <div className="pt-6">
                     <button 
                       type="submit" 
                       disabled={isSubmitting}
                       className="flex items-center gap-3 bg-black text-white px-10 py-5 rounded-[24px] font-bold uppercase tracking-widest hover:bg-pink-500 transition-all shadow-xl hover:-translate-y-1 disabled:opacity-50"
                     >
                       <Save size={18} /> {isSubmitting ? 'Preserving...' : 'Save Refinement'}
                     </button>
                   </div>
                 </Form>
               )}
             </Formik>
          </div>
        </div>

        {/* Right Column: Security & Suggestions */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white/70 backdrop-blur-xl rounded-[40px] p-8 border border-white/50 shadow-sm">
            <h3 className="text-xl font-elegant text-neutral-800 mb-8 flex items-center gap-4">
              <Lock size={20} className="text-pink-400" /> Vault Security
            </h3>

            <Formik
              initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
              validationSchema={PasswordSchema}
              onSubmit={handlePasswordSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="space-y-2">
                    <Field name="currentPassword" type="password" placeholder="Current Password" className="w-full bg-neutral-50 border border-neutral-100 px-6 py-4 rounded-2xl focus:ring-1 focus:ring-pink-300 outline-none text-sm" />
                    <ErrorMessage name="currentPassword" component="div" className="text-rose-500 text-[10px] font-bold uppercase ml-2" />
                  </div>
                  <div className="space-y-2">
                    <Field name="newPassword" type="password" placeholder="New Password" className="w-full bg-neutral-50 border border-neutral-100 px-6 py-4 rounded-2xl focus:ring-1 focus:ring-pink-300 outline-none text-sm" />
                    <ErrorMessage name="newPassword" component="div" className="text-rose-500 text-[10px] font-bold uppercase ml-2" />
                  </div>
                  <div className="space-y-2">
                    <Field name="confirmPassword" type="password" placeholder="Confirm New Password" className="w-full bg-neutral-50 border border-neutral-100 px-6 py-4 rounded-2xl focus:ring-1 focus:ring-pink-300 outline-none text-sm" />
                    <ErrorMessage name="confirmPassword" component="div" className="text-rose-500 text-[10px] font-bold uppercase ml-2" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-neutral-800 text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-black transition-all text-[10px] disabled:opacity-50">
                    {isSubmitting ? 'Securing...' : 'Rotate Password'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-[40px] p-8 text-white relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
               <Sparkles size={200} />
            </div>
            <h3 className="text-xl font-elegant mb-6 relative z-10">Boutique Advice</h3>
            <ul className="space-y-6 relative z-10">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-pink-300 font-bold text-xs">1</div>
                <p className="text-sm font-light text-neutral-300 leading-relaxed">Ensure your <span className="text-white font-medium">Boutique Name</span> reflects your brand's essence for better customer trust.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-pink-300 font-bold text-xs">2</div>
                <p className="text-sm font-light text-neutral-300 leading-relaxed">Upload a <span className="text-white font-medium">Professional Image</span> to add a human touch to your digital storefront.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-pink-300 font-bold text-xs">3</div>
                <p className="text-sm font-light text-neutral-300 leading-relaxed">Update your <span className="text-white font-medium">Bio</span> with your fragrance philosophy to connect with true enthusiasts.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
