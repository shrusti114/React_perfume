import React, { useState, useRef, useEffect } from 'react';
import { X, Mail, RotateCcw } from 'lucide-react';
import axios from 'axios';

const OtpModal = ({ email, onSuccess, onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
    const timer = setInterval(() => {
      setResendCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError('');
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/verify-otp', {
        email,
        otp: code,
      });
      onSuccess(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCountdown > 0) return;
    setResendLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      setResendCountdown(60);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-black border border-[#f8c8dc]/20 rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-500 hover:text-[#f8c8dc] transition-colors"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-[#f8c8dc]/10 border border-[#f8c8dc]/20 mb-5">
            <Mail size={24} className="text-[#f8c8dc]" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-white mb-2 tracking-wide">Verify your Email</h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            We sent a 6-digit code to<br />
            <span className="text-[#f8c8dc] font-semibold">{email}</span>
          </p>
        </div>

        {/* OTP Inputs */}
        <form onSubmit={handleSubmit}>
          <div className="flex gap-3 justify-center mb-6" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 bg-white/5 text-white transition-all duration-200 focus:outline-none focus:scale-105 ${
                  digit
                    ? 'border-[#f8c8dc] text-[#f8c8dc]'
                    : 'border-white/10 focus:border-[#f8c8dc]/60'
                }`}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-400 text-xs text-center mb-4 font-semibold uppercase tracking-wider">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f8c8dc] text-black py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed mb-4"
          >
            {loading ? 'Verifying...' : 'Verify Account'}
          </button>
        </form>

        {/* Resend */}
        <div className="text-center">
          <button
            onClick={handleResend}
            disabled={resendCountdown > 0 || resendLoading}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-500 hover:text-[#f8c8dc] transition-colors disabled:cursor-not-allowed disabled:opacity-50 uppercase tracking-widest font-semibold"
          >
            <RotateCcw size={12} />
            {resendCountdown > 0
              ? `Resend OTP in ${resendCountdown}s`
              : resendLoading ? 'Sending...' : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
