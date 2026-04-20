import React, { useState } from 'react';
import { ShieldCheck, RefreshCw, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function VerifyOtpModal({ email, onVerify, onResend, onCancel }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [status, setStatus] = useState(null);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(email, otp.join(''), setStatus);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <div className="bg-white dark:bg-[#111] w-full max-w-md rounded-[3rem] border border-black/5 dark:border-white/10 shadow-2xl relative overflow-hidden p-10">
        <button onClick={onCancel} className="absolute top-8 right-8 text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
          <X size={24} />
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex p-4 rounded-3xl bg-[#f8c8dc]/10 text-[#f8c8dc] mb-6">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-serif text-black dark:text-white mb-2">Verify Your Email</h2>
          <p className="text-neutral-500 font-light text-sm max-w-[250px] mx-auto">
            We've sent a 6-digit code to <span className="font-bold text-black dark:text-white">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {status && (
            <div className="p-4 bg-red-900/30 border border-red-500/20 text-red-400 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-center">
              {status}
            </div>
          )}

          <div className="flex justify-between gap-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                id={`otp-${i}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-16 bg-neutral-50 dark:bg-black border border-black/10 dark:border-white/10 rounded-2xl text-center text-2xl font-bold text-black dark:text-white focus:outline-none focus:border-[#f8c8dc] focus:ring-1 focus:ring-[#f8c8dc] transition-all"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-black dark:bg-[#f8c8dc] text-white dark:text-black py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:opacity-90 transition-all transform hover:-translate-y-1 shadow-lg"
          >
            Verify Account
          </button>

          <button
            type="button"
            onClick={() => onResend(email)}
            className="w-full flex items-center justify-center gap-2 text-neutral-500 hover:text-black dark:hover:text-white text-[10px] uppercase font-bold tracking-widest transition-colors"
          >
            <RefreshCw size={14} /> Resend OTP
          </button>
        </form>
      </div>
    </div>
  );
}
