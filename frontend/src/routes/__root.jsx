import React from 'react';
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';

import Navbar from '../components/common/layout/Navbar';
import Footer from '../components/common/layout/Footer';

export const Route = createRootRoute({
  component: () => {
    return (
        <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-black font-sans transition-colors duration-300 overflow-x-hidden text-black dark:text-white">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
  },
});
