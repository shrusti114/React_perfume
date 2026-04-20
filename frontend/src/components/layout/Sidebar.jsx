import React from 'react';
import { Link } from '@tanstack/react-router';

const Sidebar = ({ role }) => (
  <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-white/90 to-gray-100/90 backdrop-blur-xl shadow-2xl border-r border-gray-200/50 z-40">
    <div className="p-8">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-slate-700 bg-clip-text text-transparent mb-8">
        {role.charAt(0).toUpperCase() + role.slice(1)} Panel
      </h2>
      <nav className="space-y-4">
        <Link to={`/${role}-dashboard`} className="flex items-center p-3 rounded-2xl text-gray-700 hover:bg-gray-200 transition font-medium">
          <span className="w-6 mr-3">📊</span> Dashboard
        </Link>
        {role === 'admin' && (
          <Link to="/admin-users" className="flex items-center p-3 rounded-2xl text-gray-700 hover:bg-gray-200 transition font-medium">
            <span className="w-6 mr-3">👥</span> Users
          </Link>
        )}
        {role === 'seller' && (
          <Link to="/seller-products" className="flex items-center p-3 rounded-2xl text-gray-700 hover:bg-gray-200 transition font-medium">
            <span className="w-6 mr-3">📦</span> Products
          </Link>
        )}
        <Link to="/profile" className="flex items-center p-3 rounded-2xl text-gray-700 hover:bg-gray-200 transition font-medium">
          <span className="w-6 mr-3">⚙️</span> Settings
        </Link>
      </nav>
    </div>
  </div>
);

export default Sidebar;

