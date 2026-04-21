import React from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { AdminStats } from '../../features/admin/components/AdminStats';
import { OrderManagementTable } from '../../features/admin/components/OrderManagementTable';
import { ProductManagementTable } from '../../features/admin/components/ProductManagementTable';
import { useAdminLogic } from '../../features/admin/hooks/useAdminLogic';
import { LayoutDashboard, ShoppingCart, Package, Users, Settings } from 'lucide-react';
import { cn } from '../../utils/cn';
import { useProducts, useUpdateProduct, useCreateProduct } from '../../hooks/useApi';

import { UserManagementTable } from '../../features/admin/components/UserManagementTable';
import { AdminKanbanBoard } from '../../features/admin/components/AdminKanbanBoard';
import { Kanban } from 'lucide-react';

import AdminDashboard from '../../components/admin/AdminDashboard';

const AdminDashboardPage = () => {
  return <AdminDashboard />;
};

export const Route = createFileRoute('/admin/dashboard')({
  beforeLoad: () => {
    const role = localStorage.getItem('role');
    if (role !== 'admin') {
      throw redirect({ to: '/' });
    }
  },
  component: AdminDashboardPage,
});
