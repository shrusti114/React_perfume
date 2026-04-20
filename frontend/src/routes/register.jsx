import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { RegisterForm } from '../features/auth/components/RegisterForm';
import { VerifyOtpModal } from '../features/auth/components/VerifyOtpModal';
import { useRegisterActions } from '../features/auth/hooks/useRegisterActions';

const RegisterPage = () => {
  const [role, setRole] = useState('user');
  const [otpEmail, setOtpEmail] = useState(null);
  const { handleRegisterSubmit, handleResendOtp, handleVerifyOtp } = useRegisterActions();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f8c8dc]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#d4af37]/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-2xl z-10 p-6">
        <div className="text-center mb-10">
          <h1 className="text-7xl font-serif text-black mb-4 tracking-tighter">Velvora</h1>
          <p className="text-neutral-400 uppercase tracking-[0.4em] text-[10px] font-bold">Luxury Perfume House</p>
        </div>

        <RegisterForm 
          role={role}
          setRole={setRole}
          onSubmit={(values, { setStatus }) => handleRegisterSubmit(values, role, setStatus, setOtpEmail)}
        />

        {otpEmail && (
          <VerifyOtpModal 
            email={otpEmail}
            onVerify={(email, otp, setStatus) => handleVerifyOtp(email, otp, setStatus, setOtpEmail)}
            onResend={handleResendOtp}
            onCancel={() => setOtpEmail(null)}
          />
        )}
      </div>
    </div>
  );
};

export const Route = createFileRoute('/register')({
  component: RegisterPage,
});
