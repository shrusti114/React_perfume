import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, UserCheck, Shield, Store, User } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OtpModal from './OtpModal';
import velvoraLogo from '../../assets/velvora_logo.png';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const roles = [
  { id: 'user', label: 'Customer', icon: <User size={18} />, desc: 'Shop & explore perfumes', color: '#f8c8dc', dashboard: '/user-dashboard' },
  { id: 'seller', label: 'Seller', icon: <Store size={18} />, desc: 'Manage your boutique', color: '#d4af37', dashboard: '/seller-dashboard' },
  { id: 'admin', label: 'Admin', icon: <Shield size={18} />, desc: 'Control panel access', color: '#87CEEB', dashboard: '/admin-dashboard' },
];

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [otpEmail, setOtpEmail] = useState(null);
  const [selectedRole, setSelectedRole] = useState('user');
  const navigate = useNavigate();

  const activeRole = roles.find(r => r.id === selectedRole);

  const handleOtpSuccess = (data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userName', data.name);
      const rd = roles.find(r => r.id === data.role);
      navigate(rd?.dashboard || '/user-dashboard');
    } else {
      setOtpEmail(null);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center font-sans py-16 px-6 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#f8c8dc]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl" />
      
      {otpEmail && (
        <OtpModal
          email={otpEmail}
          onSuccess={handleOtpSuccess}
          onClose={() => setOtpEmail(null)}
        />
      )}

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src={velvoraLogo} alt="Velvora" className="h-16 w-16 object-contain rounded-full mx-auto shadow-lg shadow-[#f8c8dc]/10" />
          </Link>
          <h2 className="text-3xl font-serif font-bold text-white mb-2 tracking-widest">WELCOME BACK</h2>
          <p className="text-neutral-500 font-light text-sm">Sign in to your Velvora account</p>
        </div>

        {/* Role Selector */}
        <div className="mb-6">
          <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-500 mb-3 text-center">Select Your Role</p>
          <div className="grid grid-cols-3 gap-2">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`relative flex flex-col items-center gap-1.5 p-4 rounded-2xl border transition-all duration-300 ${
                  selectedRole === role.id
                    ? 'border-transparent shadow-xl scale-[1.02]'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
                }`}
                style={selectedRole === role.id ? {
                  background: `linear-gradient(135deg, ${role.color}15, ${role.color}05)`,
                  borderColor: `${role.color}50`,
                  boxShadow: `0 8px 30px ${role.color}15`,
                } : {}}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                  style={{
                    backgroundColor: selectedRole === role.id ? `${role.color}20` : 'rgba(255,255,255,0.05)',
                    color: selectedRole === role.id ? role.color : '#666',
                  }}
                >
                  {role.icon}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                  selectedRole === role.id ? 'text-white' : 'text-neutral-500'
                }`}>
                  {role.label}
                </span>
                <span className="text-[8px] text-neutral-600 font-light">{role.desc}</span>
                {selectedRole === role.id && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px]" style={{ backgroundColor: role.color, color: role.color === '#d4af37' ? '#fff' : '#000' }}>✓</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white/5 border border-white/10 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-sm" style={{ borderColor: `${activeRole.color}15` }}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              try {
                const { data } = await axios.post('http://localhost:5000/api/auth/login', {
                  email: values.email,
                  password: values.password,
                }, {
                  headers: { 'Content-Type': 'application/json' },
                });

                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('userName', data.name);

                const rd = roles.find(r => r.id === data.role);
                navigate(rd?.dashboard || '/user-dashboard');
              } catch (error) {
                const errData = error.response?.data;
                if (error.response?.status === 403 && errData?.requiresOtp) {
                  setOtpEmail(errData.email || values.email);
                } else {
                  setStatus(errData?.message || 'Authentication failed. Please try again.');
                }
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-5">
                {status && (
                  <div className="p-4 bg-red-900/30 border border-red-500/20 text-red-400 rounded-2xl text-xs font-bold uppercase tracking-widest text-center">
                    {status}
                  </div>
                )}

                {/* Role indicator */}
                <div className="flex items-center gap-2 p-3 rounded-xl" style={{ backgroundColor: `${activeRole.color}10` }}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${activeRole.color}20`, color: activeRole.color }}>
                    {activeRole.icon}
                  </div>
                  <div>
                    <p className="text-white text-xs font-bold">Signing in as {activeRole.label}</p>
                    <p className="text-neutral-500 text-[10px]">{activeRole.desc}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest font-bold mb-2 ml-1" style={{ color: activeRole.color }}>Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-[#f8c8dc]">
                      <Mail size={16} />
                    </div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-white/5 border border-white/10 pl-11 pr-4 py-4 rounded-2xl text-white focus:outline-none transition-all placeholder-neutral-600 text-sm"
                      style={{ '--tw-ring-color': activeRole.color }}
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-2 ml-2 font-semibold" />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs uppercase tracking-widest font-bold ml-1" style={{ color: activeRole.color }}>Password</label>
                    <a href="#" className="text-xs text-neutral-500 hover:text-[#f8c8dc] transition-colors font-semibold tracking-widest uppercase">Forgot?</a>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-[#f8c8dc]">
                      <Lock size={16} />
                    </div>
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="w-full bg-white/5 border border-white/10 pl-11 pr-12 py-4 rounded-2xl text-white focus:outline-none transition-all placeholder-neutral-600 text-sm"
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-neutral-500 hover:text-[#f8c8dc] transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </div>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-400 text-xs mt-2 ml-2 font-semibold" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-2 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all transform hover:-translate-y-1 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                  style={{
                    backgroundColor: activeRole.color,
                    color: activeRole.color === '#d4af37' ? '#fff' : '#000',
                  }}
                >
                  <UserCheck size={16} />
                  {isSubmitting ? 'Signing in...' : `Sign In as ${activeRole.label}`}
                </button>

                {/* Quick Login Hints */}
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <p className="text-[9px] uppercase tracking-widest font-bold text-neutral-500 mb-2">Demo Credentials</p>
                  {selectedRole === 'admin' && (
                    <p className="text-neutral-400 text-xs">admin@velvora.com / admin@123</p>
                  )}
                  {selectedRole === 'seller' && (
                    <p className="text-neutral-400 text-xs">chanel@velvora.com / seller@123</p>
                  )}
                  {selectedRole === 'user' && (
                    <p className="text-neutral-400 text-xs">sophia@gmail.com / user@123</p>
                  )}
                </div>

                <p className="text-center text-neutral-500 text-sm font-light pt-2">
                  Don't have an account?{' '}
                  <Link to="/register" className="font-bold hover:text-white transition-colors" style={{ color: activeRole.color }}>Register</Link>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
