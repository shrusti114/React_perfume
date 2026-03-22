import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Sparkles, UserCheck } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  return (
    <div className="bg-[#fafafa] min-h-screen flex items-center justify-center font-sans py-16 px-6">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#FFD1DC]/30 mb-6 shadow-sm">
            <Sparkles size={32} className="text-[#FFD1DC]" />
          </div>
          <h2 className="text-4xl font-elegant text-[#000000] mb-3">Welcome Back</h2>
          <p className="text-neutral-500 font-light">Access your Westion account.</p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#000000]/5 shadow-sm relative overflow-hidden">
          
          <div className="flex justify-center mb-8 bg-[#fafafa] p-1.5 rounded-full border border-[#000000]/10">
            {['admin', 'seller', 'user'].map((btnRole) => (
              <button
                key={btnRole}
                onClick={() => setRole(btnRole)}
                className={`flex-1 py-2 rounded-full text-xs uppercase tracking-widest font-bold transition-all duration-300 ${
                  role === btnRole 
                    ? 'bg-[#000000] text-white shadow-md' 
                    : 'text-neutral-500 hover:text-[#000000]'
                }`}
              >
                {btnRole}
              </button>
            ))}
          </div>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              try {
                const { data } = await axios.post('http://localhost:5000/api/auth/login', {
                  email: values.email,
                  password: values.password
                });

                localStorage.setItem('token', data.token);
                localStorage.setItem('role', data.role);
                localStorage.setItem('userName', data.name);
                
                if (data.role === 'admin') navigate('/admin-dashboard');
                else if (data.role === 'seller') navigate('/seller-dashboard');
                else navigate('/user-dashboard');
              } catch (error) {
                setStatus(error.response?.data?.message || 'Authentication failed');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, status }) => (
              <Form>
                {status && (
                  <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-xs font-bold uppercase tracking-widest text-center animate-pulse">
                    {status}
                  </div>
                )}
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-[#FFD1DC]">
                      <Mail size={18} />
                    </div>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      className="w-full bg-[#fafafa] border border-[#000000]/10 pl-11 pr-4 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-all placeholder-neutral-400"
                    />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold ml-1 text-black">Password</label>
                    <a href="#" className="text-xs text-neutral-500 hover:text-[#000000] transition-colors font-bold">Forgot?</a>
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-[#FFD1DC]">
                      <Lock size={18} />
                    </div>
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full bg-[#fafafa] border border-[#000000]/10 pl-11 pr-12 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-all placeholder-neutral-400"
                    />
                    <div 
                      className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-neutral-400 hover:text-[#FFD1DC] transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </div>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center gap-2 bg-[#000000] text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#FFD1DC] hover:text-[#000000] transition-all transform hover:-translate-y-1 shadow-md mb-6"
                >
                  <UserCheck size={18} /> Sign In
                </button>
                
                <p className="text-center text-neutral-500 text-sm font-light">
                  Don't have an account? <Link to="/register" className="text-[#000000] font-bold hover:text-[#FFD1DC] transition-colors">Register</Link>
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
