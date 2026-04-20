import { useUserProfile, useUpdateProfile } from '../../../hooks/useApi';
import { useAuth } from '../../../context/AuthContext';
import { toast } from 'sonner';

/**
 * Hook for managing user profile business logic.
 */
export function useProfileLogic() {
  const { refreshProfile } = useAuth();
  const { data: profile, isLoading } = useUserProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const handleUpdateProfile = (values) => {
    updateProfile(values, {
      onSuccess: async () => {
        await refreshProfile();
        toast.success('Profile Updated', {
          description: 'Your changes have been saved successfully.',
          icon: '✨'
        });
      },
      onError: (error) => {
        toast.error('Synchronization Failed', {
          description: error?.response?.data?.message || 'Could not update profile. Access denied or server error.'
        });
      }
    });
  };

  return {
    profile,
    isLoading,
    handleUpdateProfile,
    isUpdating
  };
}
