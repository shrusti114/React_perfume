import React from 'react';
import { createFileRoute, useSearch } from '@tanstack/react-router';
import { ProfileLayout } from '../../features/profile/components/ProfileLayout';
import { ProfileDetails } from '../../features/profile/components/ProfileDetails';
import { OrderHistory } from '../../features/profile/components/OrderHistory';
import { useProfileLogic } from '../../features/profile/hooks/useProfileLogic';
import { useUserOrders } from '../../hooks/useApi';

const ProfilePage = () => {
  const { tab } = useSearch({ from: '/user/profile' });
  const activeTab = tab || 'details';
  
  const { profile, isLoading, handleUpdateProfile, isUpdating } = useProfileLogic();
  const { data: orders, isLoading: isLoadingOrders } = useUserOrders();

  if (isLoading || isLoadingOrders) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-black">
        <div className="w-12 h-12 border-4 border-[#f8c8dc] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <ProfileLayout activeTab={activeTab} profile={profile}>
      {activeTab === 'details' && (
        <ProfileDetails 
          profile={profile} 
          onUpdate={handleUpdateProfile} 
          isUpdating={isUpdating} 
        />
      )}
      
      {activeTab === 'orders' && (
        <OrderHistory orders={orders} />
      )}

      {activeTab === 'addresses' && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-serif text-black dark:text-white mb-4">Address Book</h2>
          <p className="text-neutral-500 text-[10px] uppercase tracking-widest font-bold">Feature coming soon...</p>
        </div>
      )}
    </ProfileLayout>
  );
};

export const Route = createFileRoute('/user/profile')({
  component: ProfilePage,
  validateSearch: (search) => ({
    tab: search.tab || 'details'
  })
});
