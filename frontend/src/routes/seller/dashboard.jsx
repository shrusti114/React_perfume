import React from 'react';
import { createFileRoute } from '@tanstack/react-router';
import SellerDashboard from '../../components/seller/SellerDashboard';

export const Route = createFileRoute('/seller/dashboard')({
  component: SellerDashboard,
});
