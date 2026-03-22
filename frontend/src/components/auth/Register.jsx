import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, Eye, EyeOff, Sparkles, UserPlus } from 'lucide-react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
  const navigate = useNavigate();

  return (
    <div className="bg-[#fafafa] min-h-screen flex items-center justify-center font-sans py-16 px-6">
      <div className="w-full max-w-xl">
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#FFD1DC]/30 mb-6 shadow-sm">
            <Sparkles size={32} className="text-[#FFD1DC]" />
          </div>
          <h2 className="text-4xl font-elegant text-[#000000] mb-3">Join Westion</h2>
          <p className="text-neutral-500 font-light">Create an account to begin your luxury journey.</p>
        </div>

        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-[#000000]/5 shadow-sm relative overflow-hidden">
          
          <div className="flex justify-center mb-8 bg-[#fafafa] p-1.5 rounded-full border border-[#000000]/10">
            {['seller', 'user'].map((btnRole) => (
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
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting, setStatus }) => {
              try {
                await axios.post('http://localhost:5000/api/auth/register', {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                  role: role
                });
                alert('Registration successful! Please login.');
                navigate('/login');
              } catch (error) {
                setStatus(error.response?.data?.message || 'Registration failed');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Full Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-[#FFD1DC]">
                        <UserIcon size={18} />
                      </div>
                      <Field
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-[#fafafa] border border-[#000000]/10 pl-11 pr-4 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-all placeholder-neutral-400"
                      />
                    </div>
                    <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Email Address</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-[#FFD1DC]">
                        <Mail size={18} />
                      </div>
                      <Field
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        className="w-full bg-[#fafafa] border border-[#000000]/10 pl-11 pr-4 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-all placeholder-neutral-400"
                      />
                    </div>
                    <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-[#FFD1DC]">
                        <Lock size={18} />
                      </div>
                      <Field
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
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

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#FFD1DC] font-bold mb-2 ml-1 text-black">Confirm Password</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400 group-focus-within:text-[#FFD1DC]">
                        <Lock size={18} />
                      </div>
                      <Field
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Repeat your password"
                        className="w-full bg-[#fafafa] border border-[#000000]/10 pl-11 pr-12 py-4 rounded-2xl text-[#000000] focus:outline-none focus:border-[#FFD1DC] focus:ring-1 focus:ring-[#FFD1DC] transition-all placeholder-neutral-400"
                      />
                    </div>
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-2 ml-2 font-semibold" />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center gap-2 bg-[#000000] text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#FFD1DC] hover:text-[#000000] transition-all transform hover:-translate-y-1 shadow-md mb-6"
                  >
                    <UserPlus size={18} /> Create Account
                  </button>
                  
                  <p className="text-center text-neutral-500 text-sm font-light">
                    Already part of our family? <Link to="/login" className="text-[#000000] font-bold hover:text-[#FFD1DC] transition-colors">Log in</Link>
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
