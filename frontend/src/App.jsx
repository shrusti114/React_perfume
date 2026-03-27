import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import Navbar from './components/layout/Navbar';
import './App.css';

/* ── Lazy-loaded Pages (code-splitting for performance) ─── */
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Explore = lazy(() => import('./pages/Explore'));
const ProductDetails = lazy(() => import('./pages/ProductDetails'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Editorial = lazy(() => import('./pages/Editorial'));
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'));
const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));
const SellerDashboard = lazy(() => import('./components/seller/SellerDashboard'));
const UserDashboard = lazy(() => import('./components/user/UserDashboard'));

/* ── Page Loader ──────────────────────── */
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-black">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 border-2 border-black/10 dark:border-[#f8c8dc]/20 border-t-black dark:border-t-[#f8c8dc] rounded-full animate-spin" />
      <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500 dark:text-neutral-400">
        Loading
      </span>
    </div>
  </div>
);

/* ── Protected Route ──────────────────── */
const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  if (!token) return <Navigate to="/login" replace />;
  if (role && userRole !== role) return <Navigate to="/login" replace />;
  return children;
};

/* ── App ──────────────────────────────── */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/about" element={<About />} />
                <Route path="/editorial" element={<Editorial />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email/:token" element={<VerifyEmail />} />
                <Route path="/admin-dashboard" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
                <Route path="/seller-dashboard" element={<ProtectedRoute role="seller"><SellerDashboard /></ProtectedRoute>} />
                <Route path="/user-dashboard" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
