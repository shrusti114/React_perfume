import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, UserCheck } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from '@tanstack/react-router';
import { cn } from '../../../utils/cn';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export function LoginForm({ activeRole, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div 
      className="bg-white/90 border border-neutral-100 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-md" 
      style={{ borderTop: `4px solid ${activeRole.color}` }}
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-6">
            {status && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-center shadow-sm">
                {status}
              </div>
            )}
 
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-neutral-50" style={{ backgroundColor: `${activeRole.color}08` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: `${activeRole.color}15`, color: activeRole.color }}>
                {activeRole.icon}
              </div>
              <div>
                <p className="text-neutral-900 text-xs font-bold uppercase tracking-tight">Signing in as {activeRole.label}</p>
                <p className="text-neutral-400 text-[10px] uppercase tracking-tighter">{activeRole.desc}</p>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] font-bold mb-3 ml-1 text-neutral-400">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-300 group-focus-within:text-black transition-colors">
                  <Mail size={16} />
                </div>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-neutral-50/50 border border-neutral-100 pl-11 pr-4 py-4 rounded-2xl text-black focus:outline-none focus:bg-white focus:border-neutral-300 focus:shadow-inner transition-all placeholder-neutral-300 text-sm"
                />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-[10px] mt-2 ml-2 font-bold uppercase tracking-wider" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-3 ml-1">
                <label className="block text-[10px] uppercase tracking-[0.2em] font-bold text-neutral-400">
                  Password
                </label>
                <a href="#" className="text-[10px] text-neutral-400 hover:text-black transition-colors font-bold tracking-[0.1em] uppercase">
                  Forgot?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-300 group-focus-within:text-black transition-colors">
                  <Lock size={16} />
                </div>
                <Field
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-4.5 rounded-2xl font-bold uppercase tracking-[0.2em] transition-all transform hover:-translate-y-1 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed text-[11px]"
              style={{
                backgroundColor: activeRole.color,
                color: activeRole.color === '#d4af37' ? '#fff' : '#000',
              }}
            >
              <UserCheck size={16} />
              {isSubmitting ? 'Signing in...' : `Sign In as ${activeRole.label}`}
            </button>

            <p className="text-center text-neutral-400 text-[10px] font-bold uppercase tracking-[0.15em] pt-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-black hover:opacity-70 transition-opacity underline decoration-[#f8c8dc] underline-offset-4 decoration-2">
                Register
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
}
