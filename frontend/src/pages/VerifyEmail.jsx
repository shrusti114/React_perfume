import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Sparkles, ArrowRight, Loader } from 'lucide-react';

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('loading'); // loading, success, error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verify = async () => {
      try {
        const { data } = await axios.post(`http://localhost:5000/api/auth/verify-email/${token}`);
        setStatus('success');
        setMessage(data.message);
      } catch (error) {
        setStatus('error');
        setMessage(error.response?.data?.message || 'Verification failed');
      }
    };
    verify();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl border border-[#000000]/5 p-12 text-center relative overflow-hidden">
        
        {/* Artistic details */}
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Sparkles size={80} />
        </div>

        {status === 'loading' && (
          <div className="space-y-8 animate-pulse">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-pink-50 text-pink-400">
              <Loader size={40} className="animate-spin" />
            </div>
            <h2 className="text-3xl font-elegant text-neutral-800">Authenticating...</h2>
            <p className="text-neutral-500 font-light">Validating your essence in our world.</p>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-emerald-50 text-emerald-500 shadow-lg shadow-emerald-100/50">
              <CheckCircle size={48} />
            </div>
            <div>
              <h2 className="text-4xl font-elegant text-neutral-800 mb-4">Ascension Complete</h2>
              <p className="text-neutral-500 font-light leading-relaxed">{message}</p>
            </div>
            <Link to="/login" className="flex items-center justify-center gap-3 w-full bg-black text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-pink-500 transition-all transform hover:-translate-y-1 shadow-xl">
              Log In to Dashboard <ArrowRight size={20} />
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-700">
            <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-rose-50 text-rose-500 shadow-lg shadow-rose-100/50">
              <XCircle size={48} />
            </div>
            <div>
              <h2 className="text-4xl font-elegant text-neutral-800 mb-4">Verification Fault</h2>
              <p className="text-neutral-500 font-light leading-relaxed">{message}</p>
            </div>
            <div className="space-y-4 pt-2">
              <Link to="/register" className="block text-sm font-bold uppercase tracking-widest text-black hover:text-pink-500 transition-colors">Apply Again</Link>
              <Link to="/" className="block text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-black transition-colors">Return to Home</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
