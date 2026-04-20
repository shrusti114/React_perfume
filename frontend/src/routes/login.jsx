import React, { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '../features/auth/components/LoginForm';
import { RoleSelector, roles } from '../features/auth/components/RoleSelector';
import { VerifyOtpModal } from '../features/auth/components/VerifyOtpModal';
import { useAuthActions } from '../features/auth/hooks/useAuthActions';
import { useRegisterActions } from '../features/auth/hooks/useRegisterActions';

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState('user');
  const [otpEmail, setOtpEmail] = useState(null);
  
  const { handleLoginSubmit, handleOtpSuccess } = useAuthActions();
  const { handleResendOtp, handleVerifyOtp } = useRegisterActions();

  const activeRole = roles.find(r => r.id === selectedRole) || roles[0];

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#f8c8dc]/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#d4af37]/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-lg z-10 p-6">
        <div className="text-center mb-10">
          <h1 className="text-7xl font-serif text-black mb-4 tracking-tighter">Velvora</h1>
          <p className="text-neutral-400 uppercase tracking-[0.4em] text-[10px] font-bold">Luxury Perfume House</p>
        </div>

        <RoleSelector selectedRole={selectedRole} onSelect={setSelectedRole} />

        <LoginForm 
          activeRole={activeRole}
          onSubmit={(values, { setStatus }) => handleLoginSubmit(values, selectedRole, setStatus, setOtpEmail)}
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

export const Route = createFileRoute('/login')({
  component: LoginPage,
});
