import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Eye, EyeOff, UserPlus } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OtpModal from './OtpModal';
import velvoraLogo from '../../assets/velvora_logo.png';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const [otpEmail, setOtpEmail] = useState(null);  // null = not at OTP step
  const navigate = useNavigate();

  const handleOtpSuccess = () => {
    navigate('/login');
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center font-sans py-16 px-6">
      {/* OTP Modal */}
      {otpEmail && (
        <OtpModal
          email={otpEmail}
          onSuccess={handleOtpSuccess}
          onClose={() => setOtpEmail(null)}
        />
      )}

      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-6">
            <img src={velvoraLogo} alt="Velvora" className="h-16 w-16 object-contain rounded-full mx-auto" />
          </Link>
          <h2 className="text-4xl font-serif font-bold text-white mb-2 tracking-widest">JOIN VELVORA</h2>
          <p className="text-neutral-400 font-light text-sm">Create an account to begin your luxury journey.</p>
        </div>

        <div className="bg-white/5 border border-[#f8c8dc]/10 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-sm">
          {/* Role Selector */}
          <div className="flex justify-center mb-8 bg-white/5 p-1.5 rounded-full border border-white/10">
            {['seller', 'user'].map((btnRole) => (
              <button
                key={btnRole}
                type="button"
                onClick={() => setRole(btnRole)}
                className={`flex-1 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                  role === btnRole
                    ? 'bg-[#f8c8dc] text-black shadow-md'
                    : 'text-neutral-500 hover:text-neutral-200'
                }`}
              >
                {btnRole}
              </button>
            ))}
          </div>

          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              try {
                await axios.post('http://localhost:5000/api/auth/register', {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                  role,
                });
                setOtpEmail(values.email);
              } catch (error) {
                setStatus(error.response?.data?.message || 'Registration failed');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, status }) => (
              <Form className="space-y-6">
                {status && (
                  <div className="p-4 bg-red-900/30 border border-red-500/20 text-red-400 rounded-2xl text-xs font-bold uppercase tracking-widest text-center">
                    {status}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Full Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-[#f8c8dc]">
                        <UserIcon size={16} />
                      </div>
                      <Field
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        className="w-full bg-white/5 border border-white/10 pl-11 pr-4 py-4 rounded-2xl text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc]/30 transition-all placeholder-neutral-600 text-sm"
                      />
                    </div>
                    <ErrorMessage name="name" component="div" className="text-red-400 text-xs mt-2 ml-2 font-semibold" />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-[#f8c8dc]">
                        <Mail size={16} />
                      </div>
                      <Field
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full bg-white/5 border border-white/10 pl-11 pr-4 py-4 rounded-2xl text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc]/30 transition-all placeholder-neutral-600 text-sm"
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-red-400 text-xs mt-2 ml-2 font-semibold" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-[#f8c8dc]">
                        <Lock size={16} />
                      </div>
                      <Field
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Min. 6 characters"
                        className="w-full bg-white/5 border border-white/10 pl-11 pr-12 py-4 rounded-2xl text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc]/30 transition-all placeholder-neutral-600 text-sm"
                      />
                      <div
                        className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-neutral-500 hover:text-[#f8c8dc] transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Eye size={16} /> : <Eye size={16} />}
                      </div>
                    </div>
                    <ErrorMessage name="password" component="div" className="text-red-400 text-xs mt-2 ml-2 font-semibold" />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#f8c8dc] font-bold mb-2 ml-1">Confirm Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-500 group-focus-within:text-[#f8c8dc]">
                        <Lock size={16} />
                      </div>
                      <Field
                        name="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Repeat password"
                        className="w-full bg-white/5 border border-white/10 pl-11 pr-4 py-4 rounded-2xl text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc]/30 transition-all placeholder-neutral-600 text-sm"
                      />
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-xs mt-2 ml-2 font-semibold" />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center gap-2 bg-[#f8c8dc] text-black py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-white transition-all transform hover:-translate-y-1 shadow-lg mb-6 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <UserPlus size={16} />
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </button>

                  <p className="text-center text-neutral-500 text-sm font-light">
                    Already a member?{' '}
                    <Link to="/login" className="text-[#f8c8dc] font-bold hover:text-white transition-colors">
                      Sign in
                    </Link>
                  </p>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
