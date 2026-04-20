import { useNavigate } from '@tanstack/react-router';
import { useAuth } from '../../../context/AuthContext';
import { roles } from '../components/RoleSelector';

/**
 * Hook for authentication actions logic.
 */
export function useAuthActions() {
  const navigate = useNavigate();
  const { login, setAuthFromOtp } = useAuth();

  const handleLoginSubmit = async (values, selectedRole, setStatus, setOtpEmail) => {
    try {
      const data = await login({
        email: values.email,
        password: values.password,
      });

      if (data.token) {
        const rd = roles.find(r => r.id === data.role);
        navigate({ to: rd?.dashboard || '/user/profile' });
      }
    } catch (error) {
      if (error.requiresOtp) {
        setOtpEmail(error.email || values.email);
      } else {
        setStatus(error.message || 'Authentication failed. Please try again.');
      }
    }
  };

  const handleOtpSuccess = (data, setOtpEmail) => {
    if (data.token) {
      setAuthFromOtp(data);
      const rd = roles.find(r => r.id === data.role);
      navigate({ to: rd?.dashboard || '/user/profile' });
    } else {
      setOtpEmail(null);
    }
  };

  return {
    handleLoginSubmit,
    handleOtpSuccess
  };
}
