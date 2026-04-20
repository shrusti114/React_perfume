import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Phone, MapPin, FileText, Lock, Camera, CheckCircle, AlertCircle, Save, Sparkles } from 'lucide-react';
import { useUserProfile, useUpdateProfile, useChangePassword } from '../../hooks/useApi';

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
  const { data: user, isLoading: loading } = useUserProfile();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();

  const [message, setMessage] = useState({ type: '', text: '' });

  const handleProfileSubmit = (values, { setSubmitting }) => {
    updateProfile.mutate(values, {
      onSuccess: (data) => {
        localStorage.setItem('userName', data.name);
        setMessage({ type: 'success', text: 'Profile synchronization complete.' });
        setSubmitting(false);
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      },
      onError: (err) => {
        setMessage({ type: 'error', text: err.response?.data?.message || 'Update failed' });
        setSubmitting(false);
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      }
    });
  };

  const handlePasswordSubmit = (values, { setSubmitting, resetForm }) => {
    changePassword.mutate({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword
    }, {
      onSuccess: () => {
        setMessage({ type: 'success', text: 'Security credentials rotated.' });
        resetForm();
        setSubmitting(false);
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      },
      onError: (err) => {
        setMessage({ type: 'error', text: err.response?.data?.message || 'Key rotation failed' });
        setSubmitting(false);
        setTimeout(() => setMessage({ type: '', text: '' }), 5000);
      }
    });
  };

  if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-8 w-8 border-t-2 border-[#D9A0A0] dark:border-[#00D4FF]"></div></div>;

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12 pb-20">
      
      {message.text && (
        <div className={`fixed top-24 right-10 z-50 p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 animate-in slide-in-from-right-4 duration-300 ${message.type === 'success' ? 'bg-white dark:bg-[#202231] text-[#D9A0A0] dark:text-[#00D4FF] border border-[#D9A0A0]/30 dark:border-[#00D4FF]/30' : 'bg-white dark:bg-[#202231] text-rose-500 border border-rose-200 dark:border-rose-500/30'}`}>
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{message.text}</span>
        </div>
      )}

      {/* Profile Header */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#D9A0A0] dark:bg-[#00D4FF] opacity-[0.03] dark:opacity-[0.05] blur-3xl rounded-[4rem]"></div>
        <div className="relative bg-white dark:bg-[#202231] rounded-[3rem] p-10 border border-[#D9A0A0]/10 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-xl flex flex-col md:flex-row items-center gap-10 overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5 dark:opacity-10 pointer-events-none text-[#D9A0A0] dark:text-[#00D4FF]">
            <Sparkles size={200} />
          </div>

          <div className="relative group/avatar">
            <div className="w-40 h-40 rounded-full bg-[#FAFAFA] dark:bg-[#1a1c27] overflow-hidden border border-[#D9A0A0]/20 dark:border-[#00D4FF]/20 shadow-inner flex items-center justify-center">
              {user?.profileImage ? (
                <img src={user.profileImage} alt="Profile" className="w-full h-full object-cover opacity-90 mix-blend-multiply dark:mix-blend-normal" />
              ) : (
                <User size={64} className="text-[#D9A0A0]/50 dark:text-[#00D4FF]/50" />
              )}
            </div>
            <button className="absolute bottom-0 right-4 w-12 h-12 bg-white dark:bg-[#2a2d3e] text-[#D9A0A0] dark:text-[#00D4FF] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(217,160,160,0.2)] dark:shadow-[0_4px_20px_rgba(0,212,255,0.2)] hover:bg-[#D9A0A0] dark:hover:bg-[#00D4FF] hover:text-white dark:hover:text-black border border-[#D9A0A0]/20 dark:border-[#00D4FF]/20 transition-all transform hover:scale-110">
              <Camera size={18} />
            </button>
          </div>
          
          <div className="text-center md:text-left flex-grow z-10">
            <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
              <h2 className="text-4xl font-bold tracking-tight text-neutral-800 dark:text-white">{user?.name}</h2>
              {user?.isVerified && (
                <span className="bg-[#D9A0A0]/10 dark:bg-[#00D4FF]/10 border border-[#D9A0A0]/30 dark:border-[#00D4FF]/30 text-[#D9A0A0] dark:text-[#00D4FF] p-1.5 rounded-full" title="Authorized Rank">
                  <CheckCircle size={16} fill="currentColor" className="text-white dark:text-[#202231]" />
                </span>
              )}
            </div>
            <p className="text-[#D9A0A0] dark:text-[#00D4FF] font-medium text-sm tracking-widest uppercase mb-6">{user?.shopName || 'Independent Associate'}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-5 py-2 bg-[#FAFAFA] dark:bg-[#1a1c27] border border-[#D9A0A0]/10 dark:border-white/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-gray-400 shadow-sm">Class: {user?.role}</span>
              <span className="px-5 py-2 bg-[#FAFAFA] dark:bg-[#1a1c27] border border-[#D9A0A0]/10 dark:border-white/5 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-500 dark:text-gray-400 shadow-sm">ID: {user?._id?.substring(0, 8)}</span>
            </div>
          </div>

          <div className="bg-[#FAFAFA] dark:bg-[#1a1c27] p-8 rounded-[2rem] border border-[#D9A0A0]/10 dark:border-white/5 shadow-inner text-center z-10 min-w-[200px]">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 mb-2">Network Induction</p>
            <p className="text-xl font-bold text-neutral-800 dark:text-white tracking-widest uppercase">{new Date(user?.createdAt).toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Form */}
        <div className="lg:col-span-8 space-y-10">
          <div className="bg-white dark:bg-[#202231] rounded-[3rem] p-10 border border-[#D9A0A0]/10 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-xl relative overflow-hidden">
             
             <h3 className="text-[15px] font-bold text-neutral-800 dark:text-white tracking-wider uppercase opacity-90 mb-10 flex items-center gap-4">
               <div className="w-1.5 h-6 bg-[#D9A0A0] dark:bg-[#00D4FF] rounded-full shadow-[0_0_10px_rgba(217,160,160,0.4)] dark:shadow-[0_0_10px_rgba(0,212,255,0.4)]"></div> Operative Profile
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
               enableReinitialize
             >
               {({ isSubmitting }) => (
                 <Form className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="space-y-3">
                       <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 px-1">Designation</label>
                       <div className="relative group">
                         <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
                         <Field name="name" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 pl-14 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 transition-all outline-none text-neutral-800 dark:text-white text-[11px] shadow-sm" />
                       </div>
                       <ErrorMessage name="name" component="div" className="text-rose-500 text-[9px] font-bold uppercase tracking-widest ml-2" />
                     </div>

                     <div className="space-y-3">
                       <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 px-1">Comms Signal</label>
                       <div className="relative group">
                         <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
                         <Field name="email" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 pl-14 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 transition-all outline-none text-neutral-800 dark:text-white text-[11px] shadow-sm" />
                       </div>
                       <ErrorMessage name="email" component="div" className="text-rose-500 text-[9px] font-bold uppercase tracking-widest ml-2" />
                     </div>

                     <div className="space-y-3">
                       <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 px-1">Secure Frequency</label>
                       <div className="relative group">
                         <Phone size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
                         <Field name="phone" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 pl-14 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 transition-all outline-none text-neutral-800 dark:text-white text-[11px] shadow-sm" placeholder="+1 (555) 000-0000" />
                       </div>
                     </div>

                     <div className="space-y-3">
                       <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 px-1">Boutique Name</label>
                       <div className="relative group">
                         <Sparkles size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
                         <Field name="shopName" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 pl-14 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 transition-all outline-none text-neutral-800 dark:text-white text-[11px] shadow-sm" />
                       </div>
                     </div>

                     <div className="md:col-span-2 space-y-3">
                       <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 px-1">Base Coordinates</label>
                       <div className="relative group">
                         <MapPin size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
                         <Field name="address" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 pl-14 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 transition-all outline-none text-neutral-800 dark:text-white text-[11px] shadow-sm" placeholder="Physical location or headquarters" />
                       </div>
                     </div>

                     <div className="md:col-span-2 space-y-3">
                       <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-gray-500 px-1">Operative Biography</label>
                       <div className="relative group flex items-start">
                         <FileText size={16} className="absolute left-5 top-5 text-neutral-400 dark:text-gray-500 group-focus-within:text-[#D9A0A0] dark:group-focus-within:text-[#00D4FF] transition-colors" />
                         <Field as="textarea" name="bio" rows="4" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 pl-14 pr-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 transition-all outline-none text-neutral-800 dark:text-white text-[11px] resize-none shadow-sm" placeholder="Provide background intel..." />
                       </div>
                       <ErrorMessage name="bio" component="div" className="text-rose-500 text-[9px] font-bold uppercase tracking-widest ml-2" />
                     </div>
                   </div>

                   <div className="pt-6">
                     <button 
                       type="submit" 
                       disabled={isSubmitting}
                       className="flex items-center justify-center w-full md:w-auto gap-3 bg-[#D9A0A0] dark:bg-[#00D4FF] text-white dark:text-black px-10 py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#E5B5B5] dark:hover:bg-cyan-300 transition-all shadow-[0_4px_15px_rgba(217,160,160,0.3)] dark:shadow-[0_0_15px_rgba(0,212,255,0.4)] disabled:opacity-50"
                     >
                       <Save size={16} /> {isSubmitting ? 'Syncing...' : 'Lock Configurations'}
                     </button>
                   </div>
                 </Form>
               )}
             </Formik>
          </div>
        </div>

        {/* Right Column: Security & Suggestions */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-white dark:bg-[#202231] rounded-[3rem] p-10 border border-[#D9A0A0]/10 dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-xl">
            <h3 className="text-[13px] font-bold uppercase tracking-widest text-neutral-800 dark:text-white mb-8 flex items-center gap-4">
              <Lock size={16} className="text-[#D9A0A0] dark:text-[#00D4FF]" /> Core Security
            </h3>

            <Formik
              initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
              validationSchema={PasswordSchema}
              onSubmit={handlePasswordSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  <div className="space-y-2">
                    <Field name="currentPassword" type="password" placeholder="Current Clearance Key" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 px-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 outline-none text-neutral-800 dark:text-white text-[10px] tracking-widest shadow-sm" />
                    <ErrorMessage name="currentPassword" component="div" className="text-rose-500 text-[9px] font-bold uppercase tracking-widest ml-2" />
                  </div>
                  <div className="space-y-2">
                    <Field name="newPassword" type="password" placeholder="New Clearance Key" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 px-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 outline-none text-neutral-800 dark:text-white text-[10px] tracking-widest shadow-sm" />
                    <ErrorMessage name="newPassword" component="div" className="text-rose-500 text-[9px] font-bold uppercase tracking-widest ml-2" />
                  </div>
                  <div className="space-y-2">
                    <Field name="confirmPassword" type="password" placeholder="Confirm New Key" className="w-full bg-white dark:bg-[#2a2d3e] border border-[#D9A0A0]/20 dark:border-white/5 px-6 py-4 rounded-2xl focus:border-[#D9A0A0] dark:focus:border-[#00D4FF] focus:ring-2 focus:ring-[#D9A0A0]/10 dark:focus:ring-[#00D4FF]/20 outline-none text-neutral-800 dark:text-white text-[10px] tracking-widest shadow-sm" />
                    <ErrorMessage name="confirmPassword" component="div" className="text-rose-500 text-[9px] font-bold uppercase tracking-widest ml-2" />
                  </div>
                  <button type="submit" disabled={isSubmitting} className="w-full bg-white dark:bg-[#1a1c27] text-neutral-600 dark:text-gray-400 py-4 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-[#FAFAFA] dark:hover:bg-white/5 hover:text-[#D9A0A0] dark:hover:text-[#00D4FF] transition-all text-[9px] border border-[#D9A0A0]/20 dark:border-white/10 disabled:opacity-50 shadow-sm">
                    {isSubmitting ? 'Authenticating...' : 'Rotate Cipher'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          <div className="bg-gradient-to-br from-[#FAFAFA] to-white dark:from-[#1a1c27] dark:to-[#202231] rounded-[3rem] p-10 border border-[#D9A0A0]/10 dark:border-white/5 text-neutral-800 relative overflow-hidden group shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-xl">
            <div className="absolute -right-8 -bottom-8 opacity-[0.03] dark:opacity-10 group-hover:scale-110 transition-transform duration-1000 text-[#D9A0A0] dark:text-[#00D4FF] mix-blend-multiply dark:mix-blend-normal pointer-events-none">
               <Sparkles size={160} />
            </div>
            <h3 className="text-[11px] font-bold uppercase tracking-widest mb-8 text-[#D9A0A0] dark:text-[#00D4FF] relative z-10">System Directives</h3>
            <ul className="space-y-6 relative z-10">
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#D9A0A0]/10 dark:bg-[#00D4FF]/10 text-[#D9A0A0] dark:text-[#00D4FF] flex items-center justify-center flex-shrink-0 font-bold text-[9px] border border-[#D9A0A0]/20 dark:border-[#00D4FF]/20">1</div>
                <p className="text-[10px] font-medium text-neutral-500 dark:text-gray-400 leading-relaxed uppercase tracking-widest">Alignment of <span className="text-neutral-800 dark:text-white">Boutique Name</span> enhances network trust scores.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#D9A0A0]/10 dark:bg-[#00D4FF]/10 text-[#D9A0A0] dark:text-[#00D4FF] flex items-center justify-center flex-shrink-0 font-bold text-[9px] border border-[#D9A0A0]/20 dark:border-[#00D4FF]/20">2</div>
                <p className="text-[10px] font-medium text-neutral-500 dark:text-gray-400 leading-relaxed uppercase tracking-widest">Secure a <span className="text-neutral-800 dark:text-white">Visual Identity</span> to establish human connection protocols.</p>
              </li>
              <li className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-[#D9A0A0]/10 dark:bg-[#00D4FF]/10 text-[#D9A0A0] dark:text-[#00D4FF] flex items-center justify-center flex-shrink-0 font-bold text-[9px] border border-[#D9A0A0]/20 dark:border-[#00D4FF]/20">3</div>
                <p className="text-[10px] font-medium text-neutral-500 dark:text-gray-400 leading-relaxed uppercase tracking-widest">Update <span className="text-neutral-800 dark:text-white">Operative Biography</span> to synchronize with syndicate standards.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
