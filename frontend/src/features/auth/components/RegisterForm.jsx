import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Eye, EyeOff, UserPlus } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from '@tanstack/react-router';
import { cn } from '../../../utils/cn';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export function RegisterForm({ role, setRole, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-white/90 border border-neutral-100 p-8 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-md">
      <div className="flex justify-center mb-8 bg-neutral-50 p-2 rounded-full border border-neutral-100 shadow-inner max-w-sm mx-auto">
        {['seller', 'user'].map((btnRole) => (
          <button
            key={btnRole}
            type="button"
            onClick={() => setRole(btnRole)}
            className={cn(
              "flex-1 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300",
              role === btnRole
                ? 'bg-[#f8c8dc] text-black shadow-lg scale-105'
                : 'text-neutral-400 hover:text-black'
            )}
          >
            {btnRole}
          </button>
        ))}
      </div>

      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={RegisterSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-6">
            {status && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-center shadow-sm">
                {status}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-3 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-300 group-focus-within:text-black transition-colors">
                    <UserIcon size={16} />
                  </div>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-neutral-50/50 border border-neutral-100 pl-11 pr-4 py-4 rounded-2xl text-black focus:outline-none focus:bg-white focus:border-neutral-300 focus:shadow-inner transition-all placeholder-neutral-300 text-sm"
                  />
                </div>
                <ErrorMessage name="name" component="div" className="text-red-500 text-[10px] mt-2 ml-2 font-bold uppercase tracking-wider" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-3 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-300 group-focus-within:text-black transition-colors">
                    <Mail size={16} />
                  </div>
                  <Field
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-neutral-50/50 border border-neutral-100 pl-11 pr-4 py-4 rounded-2xl text-black focus:outline-none focus:bg-white focus:border-neutral-300 focus:shadow-inner transition-all placeholder-neutral-300 text-sm"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-[10px] mt-2 ml-2 font-bold uppercase tracking-wider" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-3 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-300 group-focus-within:text-black transition-colors">
                    <Lock size={16} />
                  </div>
                  <Field
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    className="w-full bg-neutral-50/50 border border-neutral-100 pl-11 pr-12 py-4 rounded-2xl text-black focus:outline-none focus:bg-white focus:border-neutral-300 focus:shadow-inner transition-all placeholder-neutral-300 text-sm"
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-neutral-300 hover:text-black transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </div>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-[10px] mt-2 ml-2 font-bold uppercase tracking-wider" />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-bold mb-3 ml-1">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-300 group-focus-within:text-black transition-colors">
                    <Lock size={16} />
                  </div>
                  <Field
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Repeat password"
                    className="w-full bg-neutral-50/50 border border-neutral-100 pl-11 pr-4 py-4 rounded-2xl text-black focus:outline-none focus:bg-white focus:border-neutral-300 focus:shadow-inner transition-all placeholder-neutral-300 text-sm"
                  />
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-[10px] mt-2 ml-2 font-bold uppercase tracking-wider" />
              </div>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 bg-[#f8c8dc] text-black py-4.5 rounded-2xl font-bold uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-all transform hover:-translate-y-1 shadow-xl mb-6 disabled:opacity-60 disabled:cursor-not-allowed text-[11px]"
              >
                <UserPlus size={16} />
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
              <p className="text-center text-neutral-400 text-[10px] font-bold uppercase tracking-[0.15em]">
                Already a member?{' '}
                <Link to="/login" className="text-black hover:opacity-70 transition-opacity underline decoration-[#f8c8dc] underline-offset-4 decoration-2">
                  Sign in
                </Link>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
