import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import authService from '../services/authService';
import api from '../api-client/api';

const AuthContext = createContext(null);

const ROLE_DASHBOARDS = {
  admin: '/admin/dashboard',
  seller: '/seller/dashboard',
  user: '/user/profile',
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // true while checking token on mount

  /* ── Hydrate user from token on mount ── */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      authService
        .getProfile()
        .then((profile) => {
          setUser(profile);
        })
        .catch(() => {
          // Token expired / invalid — clear it
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          localStorage.removeItem('userName');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  /* ── Merge Guest Cart ── */
  const mergeGuestCart = async () => {
    try {
      const guestCart = JSON.parse(localStorage.getItem('guest_cart'));
      if (guestCart && guestCart.length > 0) {
        for (const item of guestCart) {
          await api.post('/cart', { productId: item.productId, quantity: item.quantity }, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
        }
        localStorage.removeItem('guest_cart');
      }
    } catch (err) {
      console.error("Failed to merge guest cart", err);
    }
  };

  /* ── Login ── */
  const login = useCallback(async (credentials) => {
    const data = await authService.login(credentials);
    // If server returns a token, the login was successful
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userName', data.name);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
        isVerified: data.isVerified,
        isEmailVerified: data.isEmailVerified,
      });
      await mergeGuestCart();
    }
    return data; // caller can check requiresOtp etc.
  }, []);

  /* ── Register ── */
  const register = useCallback(async (userData) => {
    const data = await authService.register(userData);
    return data;
  }, []);

  /* ── OTP Actions ── */
  const sendOtp = useCallback(async (email) => {
    const data = await authService.sendOtp(email);
    return data;
  }, []);

  const verifyOtp = useCallback(async (credentials) => {
    const data = await authService.verifyOtp(credentials.email, credentials.otp);
    return data;
  }, []);

  /* ── Set user after OTP verification ── */
  const setAuthFromOtp = useCallback(async (data) => {
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('userName', data.name);
      setUser({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      });
      await mergeGuestCart();
    }
  }, []);

  /* ── Logout ── */
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');
    setUser(null);
  }, []);

  /* ── Refresh profile ── */
  const refreshProfile = useCallback(async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
      return profile;
    } catch {
      return null;
    }
  }, []);

  /* ── Derived helpers ── */
  const isAuthenticated = !!user;
  const role = user?.role || null;
  const dashboardPath = role ? ROLE_DASHBOARDS[role] : '/login';

  const value = {
    user,
    loading,
    isAuthenticated,
    role,
    dashboardPath,
    login,
    register,
    sendOtp,
    verifyOtp,
    logout,
    setAuthFromOtp,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
