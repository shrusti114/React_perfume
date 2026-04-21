import React from 'react';
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';

import Navbar from '../components/common/layout/Navbar';
import Footer from '../components/common/layout/Footer';

export const Route = createRootRoute({
  component: () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname.startsWith('/seller');

    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-black font-sans transition-colors duration-300 overflow-x-hidden text-black dark:text-white">
            {!isAdminRoute && <Navbar />}
            <main className={`flex-grow ${isAdminRoute ? 'h-full w-full' : ''}`}>
                <Outlet />
            </main>
            {!isAdminRoute && <Footer />}
        </div>
    );
  },
});
