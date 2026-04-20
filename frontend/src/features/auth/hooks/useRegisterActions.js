import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../../context/AuthContext';

/**
 * Hook for registration actions logic.
 */
export function useRegisterActions() {
  const navigate = useNavigate();
  const { register, sendOtp, verifyOtp, setAuthFromOtp } = useAuth();

  const handleRegisterSubmit = async (values, role, setStatus, setOtpEmail) => {
    try {
      const data = await register({
        name: values.name,
        email: values.email,
        password: values.password,
        role: role
      });

      if (!data.isEmailVerified) {
        setOtpEmail(values.email);
      } else {
        // If some role auto-verifies, immediately push them to login.
        navigate({ to: '/login' });
      }
    } catch (error) {
      setStatus(error.message || 'Registration failed. Please try again.');
    }
  };

  const handleResendOtp = async (email) => {
    try {
      await sendOtp(email);
    } catch (error) {
      console.error('Failed to resend OTP', error);
    }
  };

  const handleVerifyOtp = async (email, otp, setStatus, setOtpEmail) => {
    try {
      const data = await verifyOtp({ email, otp });
      if (data.token) {
        setAuthFromOtp(data);
        const dashboard = data.role === 'admin' ? '/admin/dashboard' : data.role === 'seller' ? '/seller/dashboard' : '/user/profile';
        navigate({ to: dashboard });
      }
    } catch (error) {
      setStatus(error.message || 'Verification failed.');
    }
  };

  return {
    handleRegisterSubmit,
    handleResendOtp,
    handleVerifyOtp
  };
}
