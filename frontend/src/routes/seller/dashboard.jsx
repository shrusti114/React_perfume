import React from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import SellerDashboard from '../../components/seller/SellerDashboard';

export const Route = createFileRoute('/seller/dashboard')({
  beforeLoad: () => {
    const role = localStorage.getItem('role');
    if (role !== 'seller' && role !== 'admin') {
      throw redirect({ to: '/' });
    }
  },
  component: SellerDashboard,
});
